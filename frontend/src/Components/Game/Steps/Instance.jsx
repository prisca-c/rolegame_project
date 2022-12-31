import React, {useState, useEffect} from "react";
import axios from "axios";

const Instance = (props) => {

  const [character, setCharacter] = useState(props.character)
  const [enemyState, setEnemyState] = useState(false)
  const [enemy, setEnemy] = useState({})
  const [phase, setPhase] = useState(1)
  const [events, setEvents] = useState([])
  const [cardState, setCardState] = useState(false)
  const [cardPicked, setCardPicked] = useState([])
  const [inventory, setInventory] = useState([
    {
      id:1,
      name:"strength potion",
      description:"potion that gives strength to the character",
      type:"consumable",
      property:["strength", "*", "1.04"],
      quantity:2
    },
  ])
  const [inventoryState, setInventoryState] = useState(false)

  /* Phase :
  * - Draw
  * - Fight (simple - Boss)
  * - Find
  * - Miscellaneous (tavern...)
  *
  */

  // Get random int between min and max
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Handle fetch and set of events
  const getCards = () => {
    if(events.length === 0){
      const event = axios.get(`${process.env.REACT_APP_API_URL}/random_event/`)

      event.then((response) => {
        setEvents(response.data)
        setCardState(true)
      })
    }
  }

  const handleActionsDisplay = () => {
    if(phase === 1){
      return(
        <div className={"instance__footer__actions__draw"}>
          <h3>Draw</h3>
          <div className={"instance__footer__actions__draw__box"}>
            <div className={"instance__footer__actions__draw__box--onclick"} onClick={getCards}>
              <p>Draw 3 Cards</p>
            </div>
          </div>
        </div>
      )
    }
  }

  // Handle cards display
  const handleCardsDisplay = () => {

    // Handle actions when card is picked
    const handleCardClick = (e) => {
      if(cardPicked.length === 0){
        if(e.currentTarget.id === "card-1") {
          //document.querySelector("#card-1").innerHTML = events[0].event.description.card_text
          setCardPicked([events[0]])
        } else if(e.currentTarget.id === "card-2") {
          setCardPicked([events[1]])
        } else if(e.currentTarget.id === "card-3") {
          //document.querySelector("#card-3").innerHTML = events[2].event.description.card_text
          setCardPicked([events[2]])
        }

        /*setTimeout(() => {
          setCardState(false)
          setPhase(2)
        } , 1000)*/
        setCardState(false)
        setPhase(2)
      }
    }

    return (
      <>
        <h2 className={"title"}>Pick a card</h2>
        <div className={"instance__main__cards"}>
          <div id={"card-1"} className={"instance__main__cards__card"} onClick={handleCardClick}>
            <p> ? </p>
          </div>
          <div id={"card-2"} className={"instance__main__cards__card"} onClick={handleCardClick}>
            <p>{events[1].event.description.card_text}</p>
          </div>
          <div id={"card-3"} className={"instance__main__cards__card"} onClick={handleCardClick}>
            <p> ? </p>
          </div>
        </div>
      </>
    )
  }

  const handleFindPhase = () => {
    let max = cardPicked[0].event.description.text.length - 1
    let int = getRandomInt(0, max)
    let display = false

    let object = cardPicked[0].object
    const handleDisplay = () => {
      document.querySelector(".instance__main__find__object").style.display = "flex"
      document.querySelector(".instance__main__find__button--display").style.display = "none"
      document.querySelector(".instance__main__find__button--add").style.display = "block"
      document.querySelector(".instance__main__find__button--drop").style.display = "block"
    }

    const handleAdd = () => {
      inventory.map((item) => {
        if(item.id === object.id){
          console.log(item)
          setInventory(inventory.map((item) => {
            if(item.id === object.id){
              item.quantity += 1
            }
            return item
          }))
        } else if(item.id !== object.id) {
          setInventory([...inventory, Object.assign(object, {quantity: 1})])
        }
      })
      setCardPicked([])
      setEvents([])

      setPhase(1)
    }

    const handleDrop = () => {
      setPhase(1)
    }

    return (
      <>
        <h2 className={"title"}>Pick Up</h2>
        <div className={"instance__main__find"}>
          <div className={"instance__main__find__infos"}>
            <p className={"instance__main__find__infos_text"}>{cardPicked[0].event.description.text[int]}</p>
          </div>
          <div className={"instance__main__find__object"} style={{ display: "none" }}>
            <h3>{object.name}</h3>
            <p>{object.description}<br/>{object.property[1]} {object.property[2]} {object.property[0]}</p>
          </div>
          <div className={"instance__main__find__button"}>
            <p className={"instance__main__find__button--display"} onClick={handleDisplay} style={{ display: "block" }}>
              Discover the object
            </p>
            <p className={"instance__main__find__button--add"} onClick={handleAdd} style={{ display: "none" }}>
              Take it
            </p>
            <p className={"instance__main__find__button--drop"} onClick={handleDrop} style={{ display: "none" }}>
              Leave it
            </p>
          </div>
        </div>
      </>
    )
  }

  const handleFightPhase = () => {
    const handleSetEnemy = () => {
      setEnemy(cardPicked[0].enemy)
      setEnemyState(true)
      document.querySelector(".instance__main__fight__button--start").style.display = "none"
    }

    return (
      <>
        <h2 className={"title"}>Fight</h2>
        <div className={"instance__main__fight"}>
          <div className={"instance__main__fight__button"}>
            <p className={"instance__main__fight__button--start"} onClick={handleSetEnemy}>Start Fight</p>
          </div>
        </div>
      </>
    )
  }

  const handleEnemyDisplay = () => {
    return (
      <>
        <h3>{enemy[0].name}</h3>
        <div className="instance__footer__enemy__stats">
          <p>Health: {enemy[0].hp}</p>
          <p>Strength: {enemy[0].strength}</p>
          <p>Ability: {enemy[0].ability}</p>
        </div>
      </>
    )
  }

  // handle inventory
  const handleInventoryDisplay = () => {

    // Handle quantity when object is used
    const handleUse = (item) => {
      if (item.quantity === 1) {
        setInventory(inventory.filter((e) => e.id !== item.id))
      } else {
        setInventory(inventory.map((e) => {
          if (e.id === item.id) {
            return {...e, quantity: e.quantity - 1}
          } else {
            return e
          }
        }))
      }
    }

    // Handle object properties when used
    const handleInventoryClick = (item) => {
      if (item.type === "consumable" || item.type === "food") {
        // Handle consumable properties
        if (item.property[1] === "*") {
          setCharacter({...character, [item.property[0]]: character[item.property[0]] * item.property[2]})
          handleUse(item)
        } else if (item.property[1] === "+") {
          setCharacter({...character, [item.property[0]]: character[item.property[0]] + item.property[2]})
          handleUse(item)
        } else if (item.property[1] === "-") {
          setCharacter({...character, [item.property[0]]: character[item.property[0]] - item.property[2]})
          handleUse(item)
        } else if (item.property[1] === "/") {
          setCharacter({...character, [item.property[0]]: character[item.property[0]] / item.property[2]})
          handleUse(item)
        } else {
          console.log("Handle consumable properties: error")
          console.log(item)
        }
      }
    }
    if(inventory) {
      return(
        <div className={"instance__main__inventory"}>
          <h2>Inventory</h2>
          <div className={"instance__main__inventory__items"}>
            {inventory.map((item, index) => {
              return(
                <div className={"instance__main__inventory__items__item"} key={index} onClick={()=>{handleInventoryClick(item)}}>
                  <p>{item.name} <br/> {item.quantity}x</p>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }

  // handle phase display
  const handleMainDisplay = () => {
    switch (phase) {
      case 1:
        return cardState ? handleCardsDisplay() : null
      case 2:
        if(cardPicked[0].event.type === "find") {
          return handleFindPhase()
        } else if(cardPicked[0].event.type.includes("fight")) {
          return handleFightPhase()
        }
        break
      default:
        return handleCardsDisplay()
    }
  }

  return (
    <div>
      <h2>Instance</h2>
      <div className="instance">
        <button className={"instance__inventory-btn"} onClick={()=>{setInventoryState(!inventoryState)}}>
          Inventory {
            inventoryState ? <span style={{ color: "red" }}>Hide</span> : <span style={{ color: "green" }}>Show</span>
          }
        </button>
        <div className={"instance__main"}>
          {inventoryState ? handleInventoryDisplay() : null}
          {handleMainDisplay()}
        </div>
        <div className={"instance__footer"}>
          <div className="instance__footer__player">
            <h3>{character.name}</h3>
            <div className="instance__footer__player__stats">
              <p>Health: {character.hp}</p>
              <p>Strength: {character.strength}</p>
              <p>Ability: {character.ability}</p>
            </div>
          </div>
          <div className="instance__footer__actions">
            {handleActionsDisplay()}
          </div>
          <div className="instance__footer__enemy">
            {enemyState ? handleEnemyDisplay() : null}
          </div>
        </div>
    </div>
    </div>
  )
}

export default Instance;