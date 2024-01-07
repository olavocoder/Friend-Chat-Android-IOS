export default function mapNavigation(obj, navObj, navAvatar, navText) {
  return obj.map((item) => ({
    ...item,
    navigation: navObj,
    navAvatar: navAvatar,
    navText: navText
  }))
}
