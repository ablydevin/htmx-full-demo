function generateRandomMessage() {
    const emojis = [
      "👽",
      "🐉",
      "🦄",
      "🔥",
      "💎",
      "🌀",
      "🌈",
      "🍄",
      "🦠",
      "🦖",
      "🦕",
      "🌌",
      "🍭",
      "🍬",
      "🍩",
      "💡",
      "🎠",
      "🛸",
      "🚀",
      "🎃",
      "🤖",
      "🔮",
      "🦑",
      "🦀",
      "🌪",
      "🌙",
      "⭐",
      "🌠",
      "💣",
      "🎉",
      "🍕",
      "🍔",
      "🍟",
      "🍺",
      "🍣",
      "🎲",
      "🧩",
      "🎮",
      "🎨",
      "🎭",
      "🎷",
      "🎸",
      "🎻",
      "🔊",
      "🎧",
      "🧙‍♂️",
      "🧚‍♀️",
      "🧜‍♂️",
      "🧞‍♀️",
      "🧟‍♂️",
    ];
  
  const comments = [
      "GG!",
      "That play was insane!",
      "LMAO 😂",
      "RIP",
      "What a comeback!",
      "PogChamp",
      "Kappa",
      "Can we get an F in the chat?",
      "This game is epic!",
      "Ez clap",
      "LOL",
      "Nice shot!",
      "I can't believe that just happened!",
      "Hype!",
      "This stream is fire 🔥",
      "Savage",
      "Well played!",
      "Big brain play right there",
      "Oof",
      "That was clutch!",
      "Stream lag?",
      "Glitch in the matrix?",
      "Rage quit incoming?",
      "Who else is here for the first time?",
      "This community is awesome",
      "I'm dead 💀",
      "That strategy though!",
      "Someone clip that!",
      "Donation train!",
      "Cheering from [country]!",
      "Stream hype!",
      "Can we hit [number] viewers?",
      "Who else is grinding this game?",
      "That's a big oof",
      "Shoutout to the mods!",
      "Who's ready for the next round?",
      "This chat is wild",
      "I'm literally shaking",
      "Can't stop watching",
      "Let's goooo!",
      "I need that skin!",
      "Best streamer ever",
      "How do you even do that?",
      "Insane skills!",
      "This is better than Netflix",
      "I'm learning so much",
      "The suspense is killing me",
      "Team [player/team name]!",
      "I wish I could play like that",
      "Is this real life?",
      "The graphics though!",
      "This is my favorite game",
      "I'm here for the memes",
      "This is intense!",
      "Heart rate: 1000 bpm",
      "That was a close one",
      "GG, WP",
      "We need a replay",
      "Can't believe my eyes",
      "This game never gets old",
      "I'm rooting for [player/team name]",
      "That was a masterclass",
      "Can't wait for the next stream",
      "This is legendary",
      "I need some snacks for this",
      "Is this the final round?",
      "Speechless",
      "This is too good",
      "My favorite part of the day",
      "I'm a fan for life",
      "This is better than reality TV",
      "I need to practice more",
      "The tension is real",
      "This game is a rollercoaster",
      "Never seen anything like this",
      "I'm on the edge of my seat",
      "This is peak gaming",
      "I'm here for the drama",
      "This gameplay is smooth",
      "The strategy is unreal",
      "I'm so invested in this",
      "Can't get enough of this stream",
      "This is my daily dose of entertainment",
      "The energy in here is amazing",
      "I'm in awe",
      "This is top-tier content",
      "I'm obsessed with this game",
      "This is a nail-biter",
      "The plays are mind-blowing",
      "I'm here every day",
      "This is my escape",
      "I'm a lifelong fan",
      "This is the best community",
      "I'm loving every second",
      "This is epic gaming",
      "I'm blown away",
      "This is the highlight of my day",
      "I'm totally hooked",
      "This is gaming at its finest",
      "I'm here for the long haul",
      "This is the best part of my week",
      "I'm amazed every time",
      "This is non-stop action",
      "I'm a true believer",
      "This is the ultimate gaming experience",
      "I'm a dedicated viewer",
      "This is the pinnacle of entertainment",
      "I'm totally immersed",
      "This is the best stream ever",
      "I'm a part of something special",
      "This is gaming history",
      "I'm here for every stream",
      "This is the best of the best",
      "I'm a committed follower",
      "This is the heart of gaming",
      "I'm a true fan",
      "This is the soul of legendary gameplay",
      "I'm forever a supporter",
      "This is the zenith of streaming",
      "I'm all in",
      "This is the core of the community",
      "I'm here to stay",
      "This is the apex of gaming",
      "I'm a permanent member",
      "This is the epitome of gaming"]
  
    const getRandomElement = (arr) => {
      const index = Math.floor(Math.random() * arr.length);
      return arr[index];
    };
  
    const randomComment = getRandomElement(comments);
    const emoji = getRandomElement(emojis);
    return `${randomComment} ${emoji}`;
  }
  
  function generateRandomUser() {
    const usernames = [
      "Luffgirl",
      "Cute_Sugarr",
      "Sweet_Sparrow",
      "The Inner Thing",
      "Etiolate",
      "Luciform",
      "Pie_Sweetness",
      "Oodles",
      "Bloom Kitty",
      "Nickbrinashipper",
      "Apropos",
      "Love_Insta",
      "Autumn Soul",
      "Moon_Up",
      "Cute Energy",
      "Corner To Corner",
      "Moongirl",
      "Smother Queen",
      "Jasmine",
      "Doll Stall",
      "Emaciate",
      "Teen_Rose",
      "Top_Command",
      "Glue Stu",
      "Fcstomper",
      "Chiaroscuro",
      "Geez God",
      "Locomate",
      "Speckled Dudess",
      "Genialkeebz",
      "Lovestump",
      "Hyper Zoom",
      "Doggondivis",
      "Funambulist",
      "Dream Girl",
      "Evil Weevil",
      "Bold_Style",
      "Bold_Touch",
      "Thought Motel",
      "Piggy_Honeybear",
      "Cyber Floss Lord",
      "Awesome_Girls",
      "Glam Angel",
      "Zombie Guide",
      "Muffinhead",
      "Pixel Anatomy",
      "Honey_Bell",
      "Purrienne_",
      "Sweet_Quail",
      "Summer Rain",
      "Caramel Cookie",
      "Whokissgirl",
      "Solacegirl",
      "Vergiform",
      "Bag Of Swag",
      "Cheeseinabag",
      "Mind Light",
      "Hug Me Tight",
      "Dragon Pie",
      "Olive Over Everything",
      "Rotten Disco Balls",
      "Wonky Buzz",
      "Apogee Point",
      "Yeah_Me",
      "Partycrasher",
      "Lemon Cupcake",
      "The Family Knot",
      "Panic_Point",
      "Sugar Momma",
      "Yautiagirl",
      "Angel_Doll",
      "Cislunar Doll",
      "Fluffycookie",
      "Shine Tin Molecules",
      "The Laidback Squirrel",
      "Goinggirl",
      "Sugar Free Diva",
      "Awkward Pink Stance",
      "Gold Unseen",
      "Posiripple",
      "Trendyschoolgirl",
      "Heyyounotyouyou",
      "Basket Of Dreams",
      "Happy In My Hut",
      "New Pole Meteorite",
      "Coriolis Extreme",
      "Divellent",
      "Respected",
      "Mostloved_Name",
      "Peafowl",
      "Starry Divinity",
      "Blue Thrill Bonzo",
      "Brain Drain Babe",
      "Doggie",
      "Awesome_Chocolate",
      "Pizza Topping Girl",
      "Top_To_Follow",
      "Cookie Angel",
      "Amazesgo0507",
      "Fly Like A Rat",
      "Droolbug",
      "Rainbow_Colours",
      "Lovely_Lights",
      "Shadow_Of_Love",
      "Hellohell",
      "Little Gorilla",
      "Meat_Duck",
      "Youarealienated",
      "Peppermint_Kisses",
      "Mocha Ooze",
      "Laurelwas",
      "Dolly_Dolphin",
      "Lyk Demon",
      "Brain Storm Angel",
      "Operaoflife",
      "Girlgaze",
      "Unforgiving Spleen",
      "Imported Sense",
      "Cute_Sugar",
      "Greed Hound",
      "Paralogism",
      "Firewalk Prophesy",
      "Torrentine",
      "Fantastic Fun",
      "Star_Belt",
      "Twinklinglights",
      "Singlemuffin",
      "Clown4u",
      "Dream Cloud Fiesta",
      "Smile_Somewhat",
      "Angelic Quest",
      "Coolchipz",
      "Butterscotch Seven",
      "Spoolgirl",
      "Egoflash",
      "Igczarevna",
      "Lovely_Dear",
      "Honey_Pot",
      "Glue Heart",
      "Angelberri",
      "Sleepy_World",
      "Bloom Thing",
    ];
    const getRandomElement = (arr) => {
      const index = Math.floor(Math.random() * arr.length);
      return arr[index];
    };
    let user = getRandomElement(usernames);
    return user;
  }
  
  function getRandomColor() {
      const colors = [
          "#FF6633",
          "#FFB399",
          "#FF33FF",
          "#FFFF99",
          "#00B3E6",
          "#E6B333",
          "#3366E6",
          "#999966",
          "#99FF99",
          "#B34D4D",
          "#80B300",
          "#809900",
          "#E6B3B3",
          "#6680B3",
          "#66991A",
          "#FF99E6",
          "#CCFF1A",
          "#FF1A66",
          "#E6331A",
          "#33FFCC",
          "#66994D",
          "#B366CC",
          "#4D8000",
          "#B33300",
          "#CC80CC",
          "#66664D",
          "#991AFF",
          "#E666FF",
          "#4DB3FF",
          "#1AB399",
          "#E666B3",
          "#33991A",
          "#CC9999",
          "#B3B31A",
          "#00E680",
          "#4D8066",
          "#809980",
          "#E6FF80",
          "#1AFF33",
          "#999933",
          "#FF3380",
          "#CCCC00",
          "#66E64D",
          "#4D80CC",
          "#9900B3",
          "#E64D66",
          "#4DB380",
          "#FF4D4D",
          "#99E6E6",
          "#6666FF",
      ];
      const getRandomElement = (arr) => {
          const index = Math.floor(Math.random() * arr.length);
          return arr[index];
      };
      let color = getRandomElement(colors);
      return color;
  }
  
  export { generateRandomMessage, generateRandomUser, getRandomColor };