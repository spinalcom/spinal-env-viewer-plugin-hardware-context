
import { getFloorEquipments, getFloorPos, findEquForPosition, addPositionToNetwork, getequipments, getPositions, addEquipementsToPositon } from "./test";






export async function hardwarecontexteGeneration(PosContextName, PosCategoryName, GroupPositions, equContext, equCategory, GroupEquipement, distance,option) {

    const PositionContext = PosContextName;
    const PositionCategory = PosCategoryName;
    const GroupPos = GroupPositions;
    const EquipementsContext = equContext
    const EquipmentsCategory = equCategory
    const Groupequ = GroupEquipement;
    const distance_pos_lum = distance;


    const positionsList = await getPositions(PositionContext, PositionCategory, GroupPos);
    const EquipmentsList = await getequipments(EquipementsContext, EquipmentsCategory, Groupequ);



    const EquipmentsByFloor = await getFloorEquipments(EquipmentsList, option.selectedNode.name.get());

    //console.log(LumByFloor);

    const PositionbyFloor = await getFloorPos(positionsList, option.selectedNode.name.get());

    //console.log(PositionbyFloor);
     console.log("avant boucle")
    for (const pos of PositionbyFloor) {
        try {
           
            
          await addPositionToNetwork(pos.Position, option);
      
          const list = findEquForPosition(pos, EquipmentsByFloor, distance_pos_lum);
          console.log("Equipments found for position:", list);
          
         if (list !== undefined) {
            await addEquipementsToPositon(list, pos.Position, option);
          } else {
            console.log(
              "No equipment found for position",
              pos.Position.name ? pos.Position.name.get() : "Unknown Position"
            );
          }
        } catch (error) {
          console.error("Error processing position:", pos.Position.name?.get(), error);
        }
      }
      
}