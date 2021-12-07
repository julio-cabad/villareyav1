import * as Yup from 'yup';

/*Login form*/
export const loginValidationSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('Correo electrónico invalido')
        .required('El correo electrónico es requerido'),
    password: Yup
        .string()
        .required('La contraseña es requerida'),
});

/*My Account Schema*/

export const myAccountSchema = Yup.object().shape({
    email: Yup.string(),
    telefono: Yup.string(),
    password: Yup
        .string()
        .min(8, ({min}) => `La contraseña debe tener ${min} caracteres`)
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'La contraseña debe tener al menos 8 caracteres, Una letra mayuscula, Una letra minuscula, Un número u un caracter especial')
        .required('La contraseña es requerida'),
    checkPassword: Yup
        .string()
        .required('La confirmación  es requerida')
        .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
    direccion: Yup.string(),
});

/*Register case*/
export const registerCaseSchema = Yup.object().shape({
    priority: Yup
        .string()
        .required('La prioridad es requerida'),
    reasons: Yup
        .string()
        .required('La razón es requerida'),
    issues: Yup
        .string()
        .required('El asunto es requerido'),
});

export const registerCaseValues = {
    priority: '',
    reasons: '',
    issues: '',
};

/*MyAccount*/

export const registerSchema = Yup.object().shape({

    email: Yup
        .string()
        .email('Correo electrónico invalido')
        .required('El correo electrónico es requerido'),
    password: Yup
        .string()
        //.min(8, ({min}) => `La contraseña debe tener ${min} caracteres`)
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'La contraseña debe tener al menos 8 caracteres, Una letra mayuscula, Una letra minuscula, Un número y un caracter especial')
        .required('La contraseña es requerida'),
    checkPassword: Yup
        .string()
        .required('La confirmación  es requerida')
        .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
});


/*Update password*/

export const updatePasswordSchema = Yup.object().shape({
    password: Yup
        .string()
        //.min(8, ({min}) => `La contraseña debe tener ${min} caracteres`)
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'La contraseña debe tener al menos 8 caracteres, Una letra mayuscula, Una letra minuscula, Un número u un caracter especial')
        .required('La contraseña es requerida'),
    checkPassword: Yup
        .string()
        .required('La confirmación  es requerida')
        .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
});

export const updatePasswordValues = {
    password: '',
    checkPassword: '',
};

/*Recover password*/


export const recoverSchema = Yup.object().shape({

    email: Yup
        .string()
        .email('Correo electrónico invalido')
        .required('El correo electrónico es requerido'),
});

export const recoverValues = {
    email: '',
};



