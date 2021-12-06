import AMapLoader from '@amap/amap-jsapi-loader'

interface IMaker {
  setMapStyle: (url: string) => void
  setMarker: (option: IMakerOption) => void
}

interface IMakerOption {
  lng: number
  lat: number
  title: string
}

const zoom = document.body.clientWidth > 3000 ? 6 : 5
const MAP_DEV_KEY = 'da0b13e09d8b5832fe5323296b737bec'
const config = {
  key: MAP_DEV_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
  version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  AMapUI: {
    // 是否加载 AMapUI，缺省不加载
    version: '1.1', // AMapUI 缺省 1.1
    plugins: [] // 需要加载的 AMapUI ui插件
  },
  Loca: {
    // 是否加载 Loca， 缺省不加载
    version: '1.3.2' // Loca 版本，缺省 1.3.2
  }
}

export const useMap = async (el: string | Element): Promise<IMaker> => {
  const AMap = await AMapLoader.load(config)
  const map = new AMap.Map(el, {
    center: new AMap.LngLat(113, 37),
    zoom,
    zooms: [4, 14]
  })
  const icon = new AMap.Icon({
    size: new AMap.Size(40, 50),
    // 点样式
    image: require('@/assets/img/homePage/flag.svg'),
    imageSize: new AMap.Size(40, 50)
  })
  map.setMarker = (option: IMakerOption) => {
    const { lng, lat, title } = option
    const marker = new AMap.Marker({
      position: new AMap.LngLat(lng, lat),
      title,
      icon
    })
    map.add(marker)
    return marker
  }
  return map
}
