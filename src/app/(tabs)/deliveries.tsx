import Container from '@/components/Container';
import { Button } from '@/components/inputs';
import Modal from '@/components/modals/Modal';
import DeliveryProductList from '@/components/delivery/DeliveryProductList';
import useDeliveriesActions from '@/hooks/actions/useDeliveriesActions';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import DeliveryForm from '@/components/forms/DeliveryForm';
import { myAlert } from '@/lib/alert';
import { objectEquals } from '@/lib/utils';

const DeliveriesScreen = () => {

  const [visible, setVisible] = React.useState(false);
  const [editFormVisible, showEditForm] = React.useState(false)
  const [selected, setSelected] = React.useState<number>(0)
  const {deliveries, addDelivery, removeDelivery, updateDelivery } = useDeliveriesActions()
  const deliveriesFiltered = useMemo(() => {
    return [...deliveries].sort((a, b) => b.timestamp - a.timestamp)
  }, [deliveries])

  return (
    <Container>
      <View style={styles.container}>
        <Button 
          title='Nouvelle livraison' 
          onPress={() => setVisible(true)}
          icon={<MaterialIcons name='add' size={20} color='#fff'/>}
        />
        <DeliveryProductList products={deliveriesFiltered} onDeliveryPressed={(_, index) => {
          setSelected(index)
          showEditForm(true)
        }} />
      </View>
      {visible && 
        <Modal visible={visible} onRequestClose={() => setVisible(false)}>
          <DeliveryForm 
            actionText='Ajouter'
            title='Nouvelle livraison'
            onValidate={(data) => { 
              addDelivery(data).then(() => {
                myAlert({
                  title: 'Ajout de livraison',
                  message: 'La livraison a ete ajouter avec success',
                  action: () => setVisible(false)
                })
              })
            }} 
          />
        </Modal>
      }

      {editFormVisible && 
        <Modal visible={editFormVisible} onRequestClose={() => showEditForm(false)}>
          <DeliveryForm 
            actionText='Editer'
            title='Editer la livraison'
            defaultValue={{
              delivery_at: deliveriesFiltered.at(selected)?.delivery_at ?? '',
              id: deliveriesFiltered.at(selected)?.id ?? '',
              product_id: deliveriesFiltered.at(selected)?.product_id ?? '',
              quantity: String(deliveriesFiltered.at(selected)?.quantity),
              timestamp: deliveriesFiltered.at(selected)?.timestamp ?? 0,
            }}
            onValidate={(data) => { 
              if(selected === undefined)
                return;
              const selectedDelivery = deliveriesFiltered.at(selected)
              if(objectEquals(data, selectedDelivery)) {
                return;
              }
              updateDelivery(selectedDelivery?.id as string, data).then(() => {
                myAlert({
                  title: 'Mise a jour',
                  message: 'La livraison a ete mise a jour avec success',
                  action: () => showEditForm(false)
                })
              })
            }}
            cancelButton={
              <Button 
                title='Supprimer' 
                style={{backgroundColor: '#f00'}} 
                icon={<MaterialIcons name='delete' size={20} color='#fff' />}
                onPress={() => {
                  const selectedDelivery = deliveriesFiltered.at(selected)
                  Alert.alert('Suppression', 'Voulez-vous vraiment supprimer cette livraison ?', [
                    {text: 'Annuler', onPress: () => {}},
                    {text: 'Supprimer', onPress: () => {
                      removeDelivery(selectedDelivery?.id as string).then(() => {
                        myAlert({
                          title: 'Livraison supprimer',
                          message: 'Livraison supprimer avec succes',
                          action: () => showEditForm(false)
                        })
                  })}}])
              }}/>
            } 
          />
        </Modal>
      }
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {},
});

export default DeliveriesScreen;