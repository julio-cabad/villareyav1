import React, {useContext} from 'react';
import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainScreen from '../screens/main-screen/MainScreen';
import SideBar from './SideBar';
import MyAccount from '../screens/my-account/MyAccount';
import Summary from '../screens/summary/Summary';
import AccountStatus from '../screens/account-status/AccountStatus';
import ConstructionStatus from '../screens/construction-status/ConstructionStatus';
import CreditStatus from '../screens/credit-status/CreditStatus';
import CaseTracking from '../screens/case-tracking/CaseTracking';
import UpdatePassword from '../screens/my-account/UpdatePassword';
import Help from '../screens/help/Help';
import {StoreContext} from '../../store/Context';
import {observer} from 'mobx-react-lite';
import LoadData from '../../palette/LoadData';
import Payments from '../screens/account-status/Payments';
import PaymentInstallments from '../screens/account-status/PaymentInstallments';
import CaseList from '../screens/case-tracking/CaseList';
import DetailCase from '../screens/case-tracking/DetailCase';
import Referred from '../screens/referred/Referred';
import TakePicture from '../screens/Picture/TakePicture';

const Drawer = createDrawerNavigator();

const Home = () => {
    const {dataStore} = useContext(StoreContext);
    const {houseList} = dataStore;

    return (
        <View style={{flex: 1}}>
            {houseList ?
                <Drawer.Navigator
                    minSwipeDistance={100}
                    drawerType={'permanent'}
                    drawerStyle={{width: 70, borderRightWidth: 0}}
                    initialRouteName={'MainScreen'}
                    hideStatusBar={true}
                    drawerContent={props => <SideBar {...props}/>}>
                    <Drawer.Screen name="MainScreen" component={MainScreen}/>
                    <Drawer.Screen name="MyAccount" component={MyAccount}/>
                    <Drawer.Screen name="Summary" component={Summary}/>
                    <Drawer.Screen name="AccountStatus" component={AccountStatus}/>
                    <Drawer.Screen name="Payments" component={Payments}/>
                    <Drawer.Screen name="PaymentInstallments" component={PaymentInstallments}/>
                    <Drawer.Screen name="ConstructionStatus" component={ConstructionStatus}/>
                    <Drawer.Screen name="CreditStatus" component={CreditStatus}/>
                    <Drawer.Screen name="CaseTracking" component={CaseTracking}/>
                    <Drawer.Screen name="CaseList" component={CaseList}/>
                    <Drawer.Screen name="DetailCase" component={DetailCase}/>
                    <Drawer.Screen name="UpdatePassword" component={UpdatePassword}/>
                    <Drawer.Screen name="Help" component={Help}/>
                    <Drawer.Screen name="Referred" component={Referred}/>
                    <Drawer.Screen name="TakePicture" component={TakePicture}/>
                </Drawer.Navigator> :
                <LoadData/>}
        </View>
    );
};

export default observer(Home);
