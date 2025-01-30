import Container from "@/components/Container";
import Section from "@/components/Section";
import { APP_AUTHOR_DESCRIPTION, APP_AUTHOR_GITHUB, APP_AUTHOR_YOUTUBE, APP_DESCRIPTION, APP_NAME, APP_VERSION } from "@/constants/about";
import { Entypo,  } from "@expo/vector-icons";
import { Linking, TouchableOpacity, View } from "react-native";
import { StyleSheet, Text } from "react-native";

const links = [
    {
        title: 'Youtube',
        icon: <Entypo name="youtube" color='#f00' />,
        url: APP_AUTHOR_YOUTUBE
    },
    {
        title: 'Github',
        icon: <Entypo name="github" />,
        url: APP_AUTHOR_GITHUB
    }
]

export default function AboutScreen()
{
    return (
        <Container>
            <View style={styles.container}>  
                <Section title="Nom de l'application" titleStyle={styles.title} contentContainerStyle={styles.sectionContainer}>
                    <Text>{APP_NAME}</Text>
                </Section>

                <Section title="Version actuelle" titleStyle={styles.title} contentContainerStyle={styles.sectionContainer}>
                    <Text>{APP_VERSION}</Text>
                </Section>

                <Section title="Description" titleStyle={styles.title} contentContainerStyle={styles.sectionContainer}>
                    <Text>{APP_DESCRIPTION}</Text>
                </Section>

                <Section title="A Propos de l'auteur" titleStyle={styles.title} contentContainerStyle={styles.sectionContainer}>
                    <Text>{APP_AUTHOR_DESCRIPTION}</Text>
                </Section>

                <Section 
                    title="Mes Liens" 
                    titleStyle={styles.title} 
                    contentContainerStyle={{
                        ...styles.sectionContainer,
                        justifyContent: 'space-evenly',
                        flexDirection: 'row'
                    }}
                >
                    {links.map((link, index) => {
                        return (
                            <TouchableOpacity style={styles.link} activeOpacity={0.8} key={index} onPress={() => {
                                Linking.openURL(link.url)
                            }}>
                                {link.icon}
                                <Text style={{color: '#00f'}}>{link.title}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </Section>
            </View> 
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10
    },
    title: {
        fontSize: 15
    },
    sectionContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
})