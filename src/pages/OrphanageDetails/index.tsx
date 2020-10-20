import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import mapMarkerImg from '../../images/map-marker.png';
import { api } from '../../services/api';

interface OrphanageDetailsRouteParams {
    id: number;
}

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    images: Array<{
        id: number;
        url: string;
    }>
}

export const OrphanageDetails = () => {
    const [orphanage, setOrphanage] = useState<Orphanage>();

    const [loaded, setLoaded] = useState(false);

    const route = useRoute();
    const params = route.params as OrphanageDetailsRouteParams;

    useEffect(() => {
        api.get(`orphanages/${params.id}`).then(response => {
            setOrphanage(response.data);
            setLoaded(true);
        })
    }, [params.id]);

    function handleOpenGoogleMaps() {
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`);
    }

    return (
        <ScrollView style={styles.container}>
            <ShimmerPlaceholder
                shimmerWidthPercent={1.2}
                visible={loaded}
                style={styles.imagesShimmer}
                contentStyle={styles.imagesContainer}
            >
                <ScrollView horizontal pagingEnabled>
                    { orphanage?.images.map(img => (
                        <Image key={img.id} style={styles.image} source={{ uri: img.url }} />
                    ))}
                </ScrollView>
            </ShimmerPlaceholder>

            <View style={styles.detailsContainer}>
                <ShimmerPlaceholder
                    shimmerWidthPercent={1.2}
                    shimmerColors={['#ebebeb', '#F0F0F0', '#ebebeb']}
                    visible={loaded}
                    style={!loaded ? styles.titleShimmer : {}}
                >
                    <Text style={styles.title}>{orphanage?.name}</Text>
                </ShimmerPlaceholder>

                <ShimmerPlaceholder
                    shimmerWidthPercent={1.2}
                    shimmerColors={['#ebebeb', '#F0F0F0', '#ebebeb']} 
                    visible={loaded} 
                    style={!loaded ? styles.descriptionShimmer : {}} 
                />
                <ShimmerPlaceholder
                    shimmerWidthPercent={1.2}
                    shimmerColors={['#ebebeb', '#F0F0F0', '#ebebeb']} 
                    visible={loaded} 
                    style={!loaded ? styles.descriptionShimmer : {}} 
                />
                <ShimmerPlaceholder
                    shimmerWidthPercent={1.2}
                    shimmerColors={['#ebebeb', '#F0F0F0', '#ebebeb']} 
                    visible={loaded} 
                    style={!loaded ? styles.descriptionShimmer : {}} 
                />
                <ShimmerPlaceholder
                    shimmerWidthPercent={1.2}
                    shimmerColors={['#ebebeb', '#F0F0F0', '#ebebeb']} 
                    visible={loaded} 
                    style={!loaded ? styles.descriptionShimmer : {}} 
                >
                    <Text style={styles.description}>{orphanage?.about}</Text>
                </ShimmerPlaceholder>

        
                <ShimmerPlaceholder
                    shimmerWidthPercent={1.2}
                    shimmerColors={['#ebebeb', '#F0F0F0', '#ebebeb']} 
                    visible={loaded} 
                    style={!loaded ? styles.mapContainerShimmer : {}}
                >
                    <View style={styles.mapContainer}>
                        { orphanage && (
                            <MapView 
                                initialRegion={{
                                    latitude: orphanage.latitude,
                                    longitude: orphanage.longitude,
                                    latitudeDelta: 0.008,
                                    longitudeDelta: 0.008,
                                }} 
                                zoomEnabled={false}
                                pitchEnabled={false}
                                scrollEnabled={false}
                                rotateEnabled={false}
                                style={styles.mapStyle}
                            >
                                
                                <Marker 
                                    icon={mapMarkerImg}
                                    coordinate={{ 
                                        latitude: orphanage.latitude,
                                        longitude: orphanage.longitude
                                    }}
                                />
                            </MapView>
                        )}

                        <TouchableOpacity onPress={handleOpenGoogleMaps} style={styles.routesContainer}>
                            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
                        </TouchableOpacity>
                    </View>
                </ShimmerPlaceholder>
            
                <View style={styles.separator} />

                <Text style={styles.title}>Instruções para visita</Text>
                <ShimmerPlaceholder
                    shimmerWidthPercent={1.2}
                    shimmerColors={['#ebebeb', '#F0F0F0', '#ebebeb']} 
                    visible={loaded} 
                    style={!loaded ? styles.instructionsShimmer : {}}
                />
                <ShimmerPlaceholder
                    shimmerWidthPercent={1.2}
                    shimmerColors={['#ebebeb', '#F0F0F0', '#ebebeb']} 
                    visible={loaded} 
                    style={!loaded ? styles.instructionsShimmer : {}}
                >
                    <Text style={styles.description}>{orphanage?.instructions}</Text>
                </ShimmerPlaceholder>

                <View style={styles.scheduleContainer}>
                    <ShimmerPlaceholder 
                        shimmerWidthPercent={1.2}
                        shimmerColors={['#ebebeb', '#F0F0F0', '#ebebeb']} 
                        visible={loaded} 
                        style={styles.scheduleItemShimmer} 
                    >
                        <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
                            <Feather name="clock" size={40} color="#2AB5D1" />
                            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>{orphanage?.opening_hours}</Text>
                        </View>
                    </ShimmerPlaceholder>

                    <ShimmerPlaceholder 
                        shimmerWidthPercent={1.2}
                        shimmerColors={['#ebebeb', '#F0F0F0', '#ebebeb']} 
                        visible={loaded} 
                        style={styles.scheduleItemShimmer} 
                    >
                        { orphanage?.open_on_weekends ? (
                            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
                                <Feather name="info" size={40} color="#39CC83" />
                                <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos aos fins de semana</Text>
                            </View>
                        ) : orphanage ? (
                            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
                                <Feather name="info" size={40} color="#FF669D" />
                                <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não atendemos aos fins de semana</Text>
                            </View>
                        ) : (null)}
                    </ShimmerPlaceholder>
                </View>

                <RectButton style={styles.contactButton} onPress={() => {}}>
                    <FontAwesome name="whatsapp" size={24} color="#FFF" />
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    imagesContainer: {
        height: 240,
    },

    image: {
        width: Dimensions.get('window').width,
        height: 240,
        resizeMode: 'cover',
    },

    detailsContainer: {
        padding: 24,
    },

    title: {
        color: '#4D6F80',
        fontSize: 30,
        fontFamily: 'Nunito_700Bold',
    },

    description: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#5c8599',
        lineHeight: 24,
        marginTop: 16,
    },

    mapContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1.2,
        borderColor: '#B3DAE2',
        marginTop: 40,
        width: '100%',
        backgroundColor: '#E6F7FB',
    },

    mapStyle: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: 150,
    },

    routesContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    routesText: {
        fontFamily: 'Nunito_700Bold',
        color: '#0089a5'
    },

    separator: {
        height: 0.8,
        width: '100%',
        backgroundColor: '#D3E2E6',
        marginVertical: 40,
    },

    scheduleContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    scheduleItem: {
        flex: 1,
        width: '100%',
        padding: 20,
        borderRadius: 20,
    },

    scheduleItemBlue: {
        backgroundColor: '#E6F7FB',
        borderWidth: 1,
        borderColor: '#B3DAE2',
        
    },

    scheduleItemGreen: {
        backgroundColor: '#EDFFF6',
        borderWidth: 1,
        borderColor: '#A1E9C5',
    },

    scheduleItemRed: {
        backgroundColor: '#FEF6F9',
        borderWidth: 1,
        borderColor: '#FFBCD4',
    },

    scheduleText: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 20,
    },

    scheduleTextBlue: {
        color: '#5C8599'
    },

    scheduleTextGreen: {
        color: '#37C77F'
    },

    scheduleTextRed: {
        color: '#FF669D'
    },

    contactButton: {
        backgroundColor: '#3CDC8C',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 40,
    },

    contactButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        color: '#FFF',
        fontSize: 16,
        marginLeft: 16,
    },

    imagesShimmer: {
        flex: 1,
        width: '100%',
        height: 240 
    },

    titleShimmer: {
        minHeight: 30,
        width: '70%',
        marginBottom: 16,
        borderRadius: 15
    },

    descriptionShimmer: {
        width: '100%',
        marginBottom: 8,
        minHeight: 16,
        borderRadius: 8
    },

    mapContainerShimmer: { 
        borderRadius: 20,
        height: 280, 
        width: '100%',
        marginTop: 40
    },

    instructionsShimmer: {
        marginTop: 16,
        width: '100%',
        minHeight: 16,
        borderRadius: 8
    },

    scheduleItemShimmer: {
        width: '48%',
        borderRadius: 20
    }
})