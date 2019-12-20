class Marcelsius extends Marcel.Plugin {
  constructor() {
    super()
    this.root = document.querySelector('#root')
    this.temp = document.querySelector('#temp')
    this.humidity = document.querySelector('#humidity')

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBcmQzvwiuXmOfQ4PX5n-Ic_OrwDK29v3U",
      authDomain: "marcelsius.firebaseapp.com",
      databaseURL: "https://marcelsius.firebaseio.com",
      projectId: "marcelsius",
      storageBucket: "marcelsius.appspot.com",
      messagingSenderId: "354306015457",
      appId: "1:354306015457:web:4b4a6a6ba11e009bfe77a0"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
    this.db = firebase.firestore()
  }

  render() {
    const { stylesvar = {} } = this.props

    this.db.collection("measures")
      .orderBy("timestamp", "desc")
      .limit(1)
      .onSnapshot(data => {
        const measure = data.docs[0].data()
        this.temp.innerHTML = `${measure.temp.toLocaleString({ maximumFractionDigits: 1 })}°C`
        this.humidity.innerHTML = `${measure.humidity.toLocaleString({ maximumFractionDigits: 1 })}%`
      })

    // stylesvar is a special property containing the global media theme.
    // You should use it to have a consistent style accross all the media.
    if (stylesvar['primary-color']) this.root.style.color = stylesvar['primary-color']
    if (stylesvar['font-family']) this.root.style.fontFamily = stylesvar['font-family']
  }
}

Marcel.init(Marcelsius)
