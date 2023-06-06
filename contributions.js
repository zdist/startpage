let [chart, widgetSize, theme, weeks] = (args.widgetParameter || "")
  .split(",")
  .map((v) => v.trim());
chart = chart || "calendar";
widgetSize = widgetSize || "medium";
theme = theme || "green";
const darkMode = Device.isUsingDarkAppearance();
let url = `https://ssr-contributions-svg.vercel.app/_/zdisanto?format=jpeg&quality=2&theme=${theme}&widget_size=${widgetSize}&chart=${chart}&dark=${darkMode}`;

if (weeks) url += `&weeks=${weeks}`;

let w = await createWidget();
Script.setWidget(w);

async function createWidget() {
  let w = new ListWidget();
  let random = (Math.random() * 100000000).toFixed(0);
  let data = await new Request(url + "&random=" + random).load();
  let image = Image.fromData(data);
  w.backgroundImage = image;
  return w;
}
