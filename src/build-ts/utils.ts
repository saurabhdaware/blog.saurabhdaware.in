export const getOgImage = ({ title }) => {
  const ogImageOptions = `c_scale,w_600/g_center,c_fit,e_colorize:50,co_rgb:222222,l_text:roboto_33_bold:${ encodeURI(title).replace(/,/g, '%252C') },r_0,w_500,y_0,x_0`;
  const ogImageURL = `https://res.cloudinary.com/saurabhdaware/image/upload/${ ogImageOptions }/v1604047618/saurabh2021/cover.png`;
  return ogImageURL;
}


// Throttle function to reduce API requests
export const throttle = function (func: () => void, delay: number) {
  // @ts-ignore
  if (window.timerId) {
    return
  }

  // @ts-ignore
  window.timerId = setTimeout(function () {
    func()
    // @ts-ignore
    window.timerId = undefined;
  }, delay)
}
