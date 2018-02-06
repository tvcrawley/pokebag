# Pokébag

## This application allows the user to store and modify pokémon and items in a backpack

A pokemon consists of the following attributes:
* entry_number
* pokemon_species
  - description
  - evolution_chain
  - experience
  - growth_rate
  - image
  - level
  - name
  - url

An item consists of the following attributes:
* effect
* image
* name
* url

A backpack consists of the following attributes:
* any pokemon added
* any items added

#### Context

```
Pokemon Go is now the most downloaded app in the Google Play or iOS App store, in that spirit we would like you to create a front end application - using any framework or tools you wish - that:

Requirements:

1. Displays and Managers a Bag inventory. This includes both Pokemon and items.
    a) Allows for the addition and removal of bag items/pokemon
    b) To select an item/pokemon from the bag and display the corresponding detailed information

2. To "evolve" a pokemon if the pokemon is at the appropriate level or the user has the appropriate items.  If a pokemon evolves the old pokemon should be removed from the bag and replaced with the new one.

As a user, when I navigate to your app I should be taken to the main page where I should have ability to interact with my bag based on the requirements listed above (the implementation and user experience is left up to you). For the MVP (minimal viable product), a user may evolve their pokemon by consuming a rare candy, if they have any.

Notes:

- You may consume the Pokeapi to obtain the correct information: http://pokeapi.co/docsv2/
- For the purposes of this exercise, we will not have the concept of a user - everything will be session based.
- For the purposes of this app, please use only the Red, Blue, and Yellow version information.
- For the purposes of this app, you are not required to display information about Game Version, Location, Encounters, Contests, or any internal data attributes (e.g. 'order', 'id').

Running your app:

1. Your app should be self-contained. That is, we should be able to copy your app to any computer and run the application.
2. We should be able to use your app in any browser by navigating to 'localhost:8000'

Extra Credit:

1. Instead of evolving pokemon by using a rare candy, you may choose to use rare candies to level up a pokemon. When a pokemon is added to the bag, it should be assigned a random level. If a pokemon can be evolved, it should be evolved into the correct pokemon once it reaches the required level.
```

### List of steps to complete
1. Create a bag (one per “user”)
2. Add pokemon or items to bag
3. Remove pokemon or items from bag
4. Display detailed info about a pokemon or item when selected
5. Incorporate PokeAPI (pokemon and items)
6. Upgrade (evolve) pokemon when pokemon is at correct level OR correct item is used
7. Old pokemon should be removed from bag once evolved (new pokemon should take its place)
8. When adding pokemon to backpack, make a GET request for custom property values and build individual pokemon objects with those values

_Notes_:
- Rare candy is allowed for evolution
- Red, Blue, and Yellow pokemon **only**
- No displays of: Game Version, Location, Encounters, Contests, or any internal data attributes (e.g. ‘order’, ‘id’)
- App is session based (no users/auth)
- Port should be localhost:8080

#### Technologies used

* HTML
* CSS
* React.JS
* Axios

#### Installation instructions
##### Viewing the App
1. Unzip the project files
2. Install dependencies with `npm install`
3. Run `npm start` in the terminal
4. Navigate to `http://localhost:8080/`

##### Viewing the Code
1. Unzip the project files
2. Install dependencies with `npm install`
3. Open project with favorite text editor

#### Improvements
- Items used to evolve pokemon currently evolve all pokemon associated with the item
- Both pokemon and items are added to the backpack array before the corresponding data from the pokeapi has been appended
- Move repeating code into helper functions
