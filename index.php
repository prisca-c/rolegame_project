<?php
    require 'Database/Objects.php';
    $objects = (new Objects())->display();
    $msg = '';
    

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
        (new Objects())->create($name, $type, $description, $property);
    }

    if(array_key_exists('delete', $_POST)) {
        (new Objects())->delete($_POST['delete']);
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
