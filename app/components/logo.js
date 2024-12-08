import { Image, View, StyleSheet} from 'react-native';
import logo from '../assets/logoB.png';

const Logo = () => {
    return (

            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Image source={logo} style={{width: 100, height: 80}} />
            </View>
    );
}

export default Logo;