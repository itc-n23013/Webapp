import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

const UsersList = ({ initialDogs }) => {
  const [images, setImages] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      setRefreshing(true)
      try {
        const [dogResponse, shibeResponse] = await Promise.all([
          fetch('https://dog.ceo/api/breeds/image/random/5'),
          fetch(
            'http://shibe.online/api/shibes?count=5&urls=true&httpsUrls=true'
          )
        ])
        const [dogData, shibeData] = await Promise.all([
          dogResponse.json(),
          shibeResponse.json()
        ])

        if (!dogData.message || !shibeData || !Array.isArray(shibeData)) {
          console.error()
          return
        }

        const mixedImages = []
        for (let i = 0; i < 5; i++) {
          mixedImages.push({
            name: generateRandomName(),
            image: dogData.message[i]
          })
          mixedImages.push({
            name: generateRandomJapaneseDogName(),
            image: shibeData[i]
          })
        }
        setImages(mixedImages)
      } catch (error) {
        console.error()
      } finally {
        setRefreshing(false)
      }
    }
    fetchImages()
  }, [])

  const generateRandomName = () => {
    const katakanaNames = [
      'ハッピー',
      'フラッフィー',
      'サニー',
      'ファジー',
      'ラッキー',
      'ブレイブ',
      'クレバー',
      'シリー',
      'チアフル',
      'アドベンチャラス',
      'マックス',
      'チャーリー',
      'クーパー',
      'バディ',
      'ジャック',
      'ロッキー'
    ]
    return katakanaNames[Math.floor(Math.random() * katakanaNames.length)]
  }

  const japaneseDogNames = [
    'たろう',
    'じろう',
    'はな',
    'こたろう',
    'ちび',
    'こまち',
    'ぶぶ',
    'ちゃちゃ',
    'まめ',
    'こころ',
    'ふく',
    'まる',
    'りく',
    'むさし',
    'こてつ'
  ]
  const generateRandomJapaneseDogName = () =>
    japaneseDogNames[Math.floor(Math.random() * japaneseDogNames.length)]

  const refreshImages = async () => {
    setRefreshing(true)
    try {
      const [dogResponse, shibeResponse] = await Promise.all([
        fetch('https://dog.ceo/api/breeds/image/random/5'),
        fetch('http://shibe.online/api/shibes?count=5&urls=true&httpsUrls=true')
      ])
      const [dogData, shibeData] = await Promise.all([
        dogResponse.json(),
        shibeResponse.json()
      ])

      if (!dogData.message || !shibeData || !Array.isArray(shibeData)) {
        console.error()
        return
      }

      const mixedImages = []
      for (let i = 0; i < 5; i++) {
        mixedImages.push({
          name: generateRandomName(),
          image: dogData.message[i]
        })
        mixedImages.push({
          name: generateRandomJapaneseDogName(),
          image: shibeData[i]
        })
      }
      setImages(mixedImages)
    } catch (error) {
      console.error()
    } finally {
      setRefreshing(false)
    }
  }

  const getRandomElement = () => {
    const elements = [
      'SSR',
      'SR',
      'SR',
      'SR',
      'SR',
      'SR',
      'R',
      'R',
      'R',
      'R',
      'R',
      'R',
      'R',
      'R',
      'R',
      'R',
      'R',
      'R'
    ]
    return elements[Math.floor(Math.random() * elements.length)]
  }

  const getFontClass = element => {
    switch (element) {
      case 'SSR':
      case 'SR':
      case 'R':
        return styles.ssrText
      default:
        return ''
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>犬と柴犬の10連ガチャ</h1>
      <div className={styles.p}> </div>
      <ul style={{ textAlign: 'center', listStyleType: 'none', padding: 0 }}>
        {images.map((image, index) => (
          <li key={index} style={{ display: 'inline-block', margin: '0 25px' }}>
            <div className={styles.imageContainer}>
              <img
                src={image.image}
                alt={image.name}
                className={styles.image}
              />
              <p
                className={`${getFontClass(getRandomElement())} ${
                  styles[getRandomElement()]
                }`}
              >
                {getRandomElement()}
              </p>
            </div>
            <p style={{ marginTop: '5px' }}>{image.name}</p>
            <div className={styles.p}> </div>
          </li>
        ))}
      </ul>
      <div className={styles.p}> </div>
      <button
        className={styles.Button}
        onClick={refreshImages}
        disabled={refreshing}
        style={{ display: 'block', margin: '0 auto', marginBottom: '20px' }}
      >
        {refreshing ? '.....' : 'ガチャを回す'}
      </button>
    </div>
  )
}

export default UsersList
