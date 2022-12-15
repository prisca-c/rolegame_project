<?php
require "./Database/Objects.php";
require "./Database/Characters.php";
require "./Database/Inventory.php";
require "./Database/ClassCharacter.php";

$object = new Objects();
$objects = $object->displayAllObjects();
$character = new Characters();
$inventory = new Inventory();
$characterClass = new ClassCharacter();
//$object->modifyObject(21, 'chicken', 'food', 'meal that gives a low amount of hp', '["hp","+","5"]');
//$character->modifyCharacter(1, "Test4", 1, 20, 10, 10);
//$inventory->createInventoryItem(1, 4, 5);
//$inventory->modifyInventoryObjectQuantity(1, 21, 30);
//$inventory->deleteInventoryCharacter(1);

echo "All Character: " . json_encode($character->displayAllCharacters()) . "<br><br>";
echo "Specific Character: " . json_encode($character->displaySpecificCharacter(1)) . "<br><br>";
echo "All Inventory: " . json_encode($inventory->displayAllInventories()) . "<br><br>";
echo "Specific Inventory: " . json_encode($inventory->displaySpecificInventory(1)) . "<br><br>";
echo "Specific Inventory Object: " . json_encode($inventory->displaySpecificInventoryObject(1, 1)) . "<br><br>";
echo "All Class: " . json_encode($characterClass->displayAllClass()) . "<br><br>";


if(empty($_POST['name']) || empty($_POST['type']) || empty($_POST['description']) || empty($_POST['property']))
{
    $msg = "Please fill out all fields.";
}
else
{
    $msg = "";
    $name = $_POST['name'];
    $type = $_POST['type'];
    $description = $_POST['description'];
    $property = $_POST['property'];
    (new Objects())->createObject($name, $type, $description, $property);
}

if(array_key_exists('delete', $_POST)) {
    (new Objects())->deleteObject($_POST['delete']);
}
?>


<h2>Add a new object</h2>
<form method="post">
    <input type="text" name="name" placeholder="Name">
    <input type="text" name="type" placeholder="Type">
    <input type="text" name="description" placeholder="Description">
    <input type="text" name="property" placeholder="Property">
    <input type="submit" name="submit" value="Submit">
</form>
<p><?php echo $msg ?><p>

<table style="border-spacing: 30px;">
    <tr>
        <td>Id</td>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
        <th>Property</th>
    </tr>
    <?php foreach ($objects as $object): ?>
        <tr>
          <td><?php echo $object['id']; ?></td>
            <td><?php echo $object['name']; ?></td>
            <td><?php echo $object['type']; ?></td>
            <td><?php echo $object['description']; ?></td>
            <td><?php echo $object['property']; ?></td>
            <td><input type="submit" name="delete" class="button" value="<?php echo $object['id']?>"></td>
        </tr>
    <?php endforeach; ?>
</table>
