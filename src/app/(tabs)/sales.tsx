import Container from '@/components/Container';
import SellForm from '@/components/forms/SellForm';
import { Button } from '@/components/inputs';
import Modal from '@/components/modals/Modal';
import SellList from '@/components/sells/SellList';
import useSellActions from '@/hooks/actions/useSellActions';
import { myAlert } from '@/lib/alert';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, StyleSheet, Alert, } from 'react-native';


export default function SalesScreen()
{
  const { sells, addSell, updateSell, removeSell } = useSellActions()
  const [visible, setVisible] = useState(false)
  const [editFormVisible, showEditForm] = useState(false)
  const [selected, setSelected] = useState<number>(0)
  const salesFiltered = [...sells].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <Container>
      <View>
        <Button 
          title="Nouvelle Vente"
          icon={<MaterialIcons name='add' size={20} color='#fff' />}
          onPress={() => setVisible(true)} 
        />
      </View>
      <View>
        <SellList 
          sells={salesFiltered} 
          onPress={(sale) => {
            setSelected(sells.indexOf(sale))
            showEditForm(true)
          }} 
        />
      </View>

      {visible && 
        <Modal visible={visible} onRequestClose={() => setVisible(false)}>
          <SellForm 
            actionText='Ajouter'
            title='Nouvelle Vente'
            onValidate={(data) => { addSell(data).then(() => {
              myAlert({
                title: "Ajout de vente",
                message: "La vente a ete ajouter avec success.",
                action: () => setVisible(false)
              })
            }) }} 
          />
        </Modal>
      }

      {editFormVisible && 
        <Modal visible={editFormVisible} onRequestClose={() => showEditForm(false)}>
          <SellForm 
            actionText='Editer'
            title='Editer la vente'
            onValidate={(data) => {
              updateSell(data.id, data).then(() => myAlert({
                title: "Editer la vente",
                message: "La vente a ete modifier avec success.",
                action: () => showEditForm(false)
              }))
            }}
            defaultValue={{
              id: sells.at(selected)?.id ?? '',
              product_id: sells.at(selected)?.product_id?.toString() ?? '',
              quantity: String(sells.at(selected)?.quantity),
              timestamp: sells.at(selected)?.timestamp ?? 0,
              sale_at: sells.at(selected)?.sale_at,
              is_rest: sells.at(selected)?.is_rest ?? false
            }}
            cancelButton={
              <Button 
                title='Supprimer' 
                style={{backgroundColor: '#f00'}} 
                icon={<MaterialIcons name='delete' size={20} color='#fff' />}
                onPress={() => { 
                  const selectedSell = sells.at(selected)
                  if(selectedSell === undefined) {
                    return;
                  }
                  
                  Alert.alert("Supprimer la vente", `Voulez-vous vraiment supprimer la vente de ${selectedSell.name} de ${selectedSell.price} XAF ?`, [
                    {text: 'Annuler', onPress: () => {}},
                    {text: 'Supprimer', onPress: () => {
                      removeSell(selectedSell.id ?? '').then(() => {
                        myAlert({
                          title: "Suppression de vente",
                          message: "La vente a ete supprimer avec success.",
                          action: () => showEditForm(false)
                        })
                      })
                    }}
                  ])
                }}
              />
            } 
          />
        </Modal>
      }

    </Container>
  );
};

const styles = StyleSheet.create({

});
