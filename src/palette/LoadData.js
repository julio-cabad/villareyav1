import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AwesomeLoading from 'react-native-awesome-loading';

const LoadData = () => {

    const [loadText] = useState('Cargando...');
   // const [load, setLoad] = useState(15);

   /* useEffect(() => {

        let isMounted = true;

        isMounted && setTimeout(() => setLoadText('Espere un momento...'), 13000);
        isMounted && setTimeout(() => setLoad(7), 13000);
        isMounted && setTimeout(() => setLoadText('Cargando datos...'), 29000);

    }, []);*/

    return (
          <AwesomeLoading indicatorId={7} size={50} isActive={true} text={loadText}
                            textStyle={{color: 'gray', marginTop: 15}}/>
         );
};

export default LoadData;

