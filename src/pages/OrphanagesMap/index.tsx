import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import { api } from '../../services/api';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export const OrphanagesMap: React.FC = () => {
    const navigation = useNavigation();

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useFocusEffect(() => {
        api.get('/orphanages').then(response => {
            setOrphanages(response.data);
        });
    })

    function handleNavigateToDetails(id: number) {
        navigation.navigate('OrphanageDetails', {
            id
        })
    }

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition')
    }

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                provider={PROVIDER_GOOGLE}
                initialRegion={{ 
                    latitude: -21.6870000,
                    longitude: -51.0730000,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008
                }} 
            >
                {
                    orphanages.map(orphanage => (
                        <Marker 
                            key={orphanage.id}
                            icon={mapMarker}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude
                            }}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.8
                            }}
                        >
                            <Callout 
                                tooltip
                                onPress={() => handleNavigateToDetails(orphanage.id)}
                            >
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))
                }
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
                <RectButton 
                    style={styles.createOrphanageButton}
                    onPress={handleNavigateToCreateOrphanage}
                >
                    <Feather name="plus" color="#FFF" size={20}/>
                </RectButton>
            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center',
        elevation: 3
    },
    calloutText: {
        fontFamily: 'Nunito_700Bold',
        color: '#0089A5',
        fontSize: 14
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#FFF',
        borderRadius:  20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3
    },

    footerText: {
        fontFamily: 'Nunito_700Bold',
        color: '#8FA7B3'
    },

    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15C3D6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
