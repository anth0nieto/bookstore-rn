import Toast from 'react-native-toast-message';

export const showToast = ({
  type = "success",
  message = "",
  title = "Login",
  onShow = () => {},
  onHide = () => {}
}) => {
  Toast.show({
    type,
    position: 'top',
    text1: title,
    text2: message,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    onShow,
    onHide,
  })
};