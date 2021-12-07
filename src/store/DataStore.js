import {makeAutoObservable, runInAction, configure} from 'mobx';
import {ErrorAlert} from '../palette/Alerts';
import axios from 'axios';
import qs from 'qs';
import {
    TOKEN_URL,
    TOKEN_USER,
    TOKEN_PWD,
    GRANT_TYPE,
    ACCOUNT_STATUS_URL,
    LOGIN_URL,
    CREATE_CASE_LIST_URL,
    PROYECTO_NUMBER,
    GET_DATAUSER_URL,
    PROYECTO,
    PAYMENTS_URL,
    PAYMENTS_INSTALLAMENTS_URL,
    REFERRED_URL,
    CREDIT_STEP_URL,
    CONTRUCTON_STATUS_URL,
} from '@env';
import {insertAvatarPath, insertCredentials, queryAvatar, querySession, updateAvatarPath} from '../database/Schemas';
import format from 'date-fns/format';
import {FilterTwo} from '../utils/HelpFunctions';


configure({
    enforceActions: 'never',
});


class DataStore {

    dataToken = null;
    dataUser = null;
    contractCode = null;
    contractStatus = null;
    houseList = null;
    accountStatus = null;
    detailAccountStatus = null;
    paymentInstallments = null;
    paymentsValue = null;
    lastPaymentDate = null;
    nextInstallment = null;
    nextInstallmentDate = null;
    countInstallment = null;
    payments = null;
    summary = null;
    client = null;
    houseImg = null;
    caseList = null;
    detailCase = null;
    referred = null;
    profilePicture = null;
    creditAdvisor = null;
    seller = null;
    creditStep = null;
    bankingInstitutionCat = null;
    typeConstruction = null;
    thickWork = null;
    equipment = null;
    detailConstructionDates = null;
    constructionStatus = null;
    images = null;

    constructor() {
        makeAutoObservable(this);
    }

    /*Token*/
    GetToken = async () => {
        const data = {username: TOKEN_USER, password: TOKEN_PWD, grant_type: GRANT_TYPE};
        const options = {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data),
            url: TOKEN_URL,
        };

        await axios(options)
            .then(res => {
                runInAction(() => {
                    this.dataToken = res.data;
                });
            }).catch(() => {
                ErrorAlert();
            });
    };

    /*New token*/
    NewToken = (token) => {
        this.dataToken = token;
    };

    /*Data users*/
    DataUser = (data) => {
        this.dataUser = data;
    };

    GetDataUser = async (idUser, token) => {
        const url = `${GET_DATAUSER_URL}${idUser}&${PROYECTO}`;
        const headers = {'Authorization': `Bearer ${token}`};

        await axios.get(url, {headers: headers})
            .then((res) => {
                const {respuesta, identificacion, nombres, email, telefono, direccion} = res.data;
                if (respuesta === 'ok') {
                    const dataUser = {identificacion, nombres, email, telefono, direccion};
                    runInAction(() => {
                        this.dataUser = dataUser;
                    });
                }
            }).catch(() => {
            });
    };

    /*Contract code*/

    ContractCode = (contractCode) => {
        this.contractCode = contractCode;
    };

    /*Account status*/
    AccountStatus = async (password, email, token, dataInsert) => {

        const result = await querySession();

        const data = {identificacion: email, proyecto: PROYECTO_NUMBER, clave: password};
        const headers = {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'};

        try {
            const loginResult = await axios.post(LOGIN_URL, data, {headers: headers});
            const houseList = loginResult.data.lista;
            const client = loginResult.data.cliente;

            // console.log(houseList)

            if (houseList === null) {
                return;
            }

            if (result.length === 0) {
                await insertCredentials(dataInsert);
            }


            const dataArray = [];
            for (const items of houseList) {
                const contractCode = items.codigoContrato;

                const filterData = houseList.filter(items => items.codigoContrato === contractCode);
                const {
                    ejecutivoCuenta, modelo, plantas, nombreUrbanizacion, fechaContrato, tipo, imagen,
                    precio, cuotaInicial, cuotaEntrada, montoFinanciar, institucionFinanciera,
                } = filterData[0];

                const url = `${ACCOUNT_STATUS_URL}${items.codigoContrato}`;
                const accountStatus = await axios.get(url, {headers: headers});
                dataArray.push({
                    ...accountStatus.data, contractCode, accountExecutive: ejecutivoCuenta, model: modelo,
                    levels: plantas, urbanizationName: nombreUrbanizacion, contractDate: fechaContrato, type: tipo,
                    price: precio, initialFee: cuotaInicial, entranceFee: cuotaEntrada, amountFinance: montoFinanciar,
                    financialInstitution: institucionFinanciera, houseImg: imagen,
                });
            }

            runInAction(() => {
                this.houseList = houseList;
                this.accountStatus = dataArray;
                this.client = client;
            });

        } catch (e) {
            // console.log(e);
            //ErrorAlert();
        }
    };

    DetailAccountStatus = (accountStatus) => {
        this.detailAccountStatus = accountStatus;
    };

    Payments = async (contractCode, token) => {

        const headers = {'Authorization': `Bearer ${token}`};
        const url = `${PAYMENTS_URL}${contractCode}`;
        try {
            const result = await axios.get(url, {headers: headers});

            const transactions = result.data.transacciones;
            transactions.forEach(items => {
                items.date = new Date(items.fecha);
            });

            const order = result.data.transacciones.sort(function (a, b) {
                return b.date - a.date;
            });

            if (order.length > 0) {
                const date = new Date(order[0].fecha);
                const lastDate = format(date, 'yyyy-MM-dd');

                const paymentValue = order.reduce(function (prev, cur) {
                    return prev + Math.abs(cur.valor);
                }, 0);

                const newData = [];
                order.forEach((items, i) => {
                    const date = format(items.date, 'dd-MM-yyyy');
                    const newObj = {
                        number: i + 1, document: items.documento, date, wayPay: items.formaPago,
                        value: items.valor,
                    };
                    newData.push(newObj);
                });

                runInAction(() => {
                    this.payments = newData;
                    this.paymentsValue = paymentValue;
                    this.lastPaymentDate = lastDate;
                });

            } else {
                runInAction(() => {
                    this.payments = [];
                    this.paymentsValue = 0;
                    this.lastPaymentDate = '';
                });
            }

        } catch (e) {
            console.log(e);
        }
    };

    PaymentInstallments = async (contractCode, token, navigation) => {
        const headers = {'Authorization': `Bearer ${token}`};
        const url = `${PAYMENTS_INSTALLAMENTS_URL}${contractCode}`;

        try {

            const result = await axios.get(url, {headers: headers});
            const records = result.data.records;

             if (records && records.length > 0) {
                records.forEach(items => {
                    items.date = new Date(items.fecha_de_Vencimiento__c);
                });

                const order = records.sort(function (a, b) {
                    return a.date - b.date;
                });

                const date = order[0].fecha_de_Vencimiento__c;

                const filter = FilterTwo(order, 'estado_de_Pago__c', 'fecha_de_Vencimiento__c', 'Vigente', date);
                const nextInstallment = filter[0];

                let countInstallment = 0;
                order.forEach(items => {
                    if (items.estado_de_Pago__c === 'Vigente') {
                        countInstallment = countInstallment + 1;
                    }
                });

                const newData = [];
                order.forEach((items, i) => {
                    const date = format(items.date, 'dd-MM-yyyy');
                    const newObj = {
                        number: i + 1, date, type: items.tipo__c, status: items.estado_de_Pago__c,
                        value: items.valor_Saldo__c,
                    };
                    newData.push(newObj);
                });

                runInAction(() => {
                    this.countInstallment = countInstallment;
                    this.nextInstallment = nextInstallment.valor_Saldo__c;
                    this.nextInstallmentDate = nextInstallment.fecha_de_Vencimiento__c;
                    this.paymentInstallments = newData;
                });

            } else {
                runInAction(() => {
                    this.countInstallment = 0;
                    this.nextInstallment = 0;
                    this.paymentInstallments = [];
                    this.nextInstallmentDate = 'S/F';
                });
            }

        } catch (e) {
            ErrorAlert();
            navigation.navigate('MainScreen');
        }
    };

    /*Summary*/
    Summary = (summary) => {
        this.summary = summary;
    };

    /*Reset Values*/
    ResetData = () => {
        this.dataToken = null;
        this.dataUser = null;
        this.contractCode = null;
        this.contractStatus = null;
        this.houseList = null;
        this.accountStatus = null;
        this.detailAccountStatus = null;
        this.paymentInstallments = null;
        this.paymentsValue = null;
        this.lastPaymentDate = null;
        this.nextInstallment = null;
        this.nextInstallmentDate = null;
        this.countInstallment = null;
        this.payments = null;
        this.summary = null;
        this.client = null;
        this.houseImg = null;
        this.caseList = null;
        this.detailCase = null;
        this.profilePicture = null;
        this.creditAdvisor = null;
        this.seller = null;
        this.creditStep = null;
        this.type = null;
        this.typeConstruction = null;
        this.thickWork = null;
        this.equipment = null;
        this.constructionStatus = null;
        this.detailConstructionDates = null;
        this.images = null;
    };

    /*House image*/
    HouseImage = (image) => {
        this.houseImg = image;
    };

    ResetCountInstallment = () => {
        this.countInstallment = null;
    };

    /*Contract status*/
    ContractStatus = (contractStatus) => {
        this.contractStatus = contractStatus;
    };

    /*Case List*/
    CaseList = async (contractCode, token) => {

        const headers = {'Authorization': `Bearer ${token}`};

        try {
            const urlList = `${CREATE_CASE_LIST_URL}${contractCode}`;
            const resultList = await axios.get(urlList, {headers: headers});
            runInAction(() => {
                this.caseList = resultList.data.records;
            });
        } catch (e) {
            // console.log(e);
        }

    };

    DetailCase = (detail) => {
        this.detailCase = detail;
    };

    /*Referidos*/

    Referred = async (id, token) => {

        const idUser = id;
        const headers = {'Authorization': `Bearer ${token}`};
        const url = `${REFERRED_URL}${idUser}&${PROYECTO}`;
        try {
            const result = await axios.get(url, {headers: headers});
            runInAction(() => {
                this.referred = result.data;
            });

        } catch (e) {
            //
        }
    };

    /*Profile photo*/
    InsertProfilePhoto = async (dataInsert) => {
        await insertAvatarPath(dataInsert);
    };

    UpdateProfilePicture = async (updatePic) => {
        await updateAvatarPath(updatePic);
    };

    ProfilePicture = async () => {
        const result = await queryAvatar();
        if (result.length > 0) {
            const {uriPath} = result[0];
            this.profilePicture = uriPath;
        } else {
            this.profilePicture = null;
        }
    };

    /*Help*/

    CreditAdvisor = (data) => {
        this.creditAdvisor = data;
    };

    Seller = (data) => {
        this.seller = data;
    };

    /*Credit step*/

    CreditStep = async (contractCode, token) => {
        const headers = {'Authorization': `Bearer ${token}`};
        const url = `${CREDIT_STEP_URL}${contractCode}`;

        try {
            const result = await axios.get(url, {headers: headers});

            runInAction(() => {
                this.creditStep = result.data;
            });

        } catch (e) {
            // console.log(e);
        }
    };

    /*Bank Institution Cat*/

    BankingInstitutionCat = (cat) => {
        this.bankingInstitutionCat = cat;
    };

    /*Type*/

    TypeConstruction = (typeConstruction) => {
        this.typeConstruction = typeConstruction.toUpperCase();
    };

    /*CONSTRUCTION STATUS*/

    ConstructionStatus = async (contractCode, token) => {

        const headers = {'Authorization': `Bearer ${token}`};

        try {
            const urlList = `${CONTRUCTON_STATUS_URL}${contractCode}`;
            const res = await axios.get(urlList, {headers: headers});

            const {
                avanceEQ,
                avanceOG,
                fechaInicioOG,
                fechaEntregaOG,
                fechaInicioEQ,
                fechaEntregaEQ,
                imagenes,
            } = res.data;

            const imgArray = [];
            if (imagenes.length > 0) {
                imagenes.forEach((img, i) => {
                    const obj = {id: (i + 1).toString(), image: img};
                    imgArray.push(obj);
                });
            }

            const ro = (100 - avanceOG).toFixed(2);
            const co = parseFloat(ro);

            const thickWork = [
                {x: '1', y: avanceOG},
                {x: '2', y: co},
            ];

            const re = (100 - avanceEQ).toFixed(2);
            const ce = parseFloat(re);
            const equipment = [
                {x: '1', y: avanceEQ},
                {x: '2', y: ce},
            ];


            const detailConstructionDates = [
                {id: 1, text: 'Fecha de inicio construcción OG', date: fechaInicioOG},
                {id: 2, text: 'Fecha de fin construcción OG', date: fechaEntregaOG},
                {id: 3, text: 'Fecha de inicio equipamiento', date: fechaInicioEQ},
                {id: 4, text: 'Fecha de fin equipamiento', date: fechaEntregaEQ},
            ];

            runInAction(() => {
                this.thickWork = thickWork;
                this.equipment = equipment;
                this.detailConstructionDates = detailConstructionDates;
                this.constructionStatus = res.data;
                this.images = imgArray;
            });
        } catch (e) {
            // console.log(e);
        }

    };
}

export {DataStore};

