import { Modal as RNModal, ModalProps as RNModalProps, StyleSheet, TouchableOpacity, View } from "react-native";

export type ModalProps = RNModalProps & {
    backdrop?: string
}

export default function Modal({style, backdrop, children, animationType, onRequestClose, ...props}: ModalProps) {
  return (
    <RNModal 
        style={[styles.modal, style]} {...props}
        transparent={true}
        onRequestClose={onRequestClose}
        animationType={animationType || 'slide'}
    >
        <View style={[styles.container, {backgroundColor: backdrop ?? 'rgba(0, 0, 0, 0.5)'}]}>
            <TouchableOpacity style={styles.spacer} onPress={onRequestClose} />
            <View style={styles.content}>
                <View style={{
                    height: 5, 
                    width: 50, 
                    backgroundColor: '#000',
                    borderRadius: 5,
                    marginBottom: 10
                }} />
                <View style={{width: '100%'}}>
                    {children}
                </View>
            </View>
        </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1
    },
    container: {
        flex: 1,
    },
    spacer: {
        flex: 1,
        height: '100%',
    },
    content: {
        backgroundColor: 'white',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    }
})