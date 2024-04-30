const Ip = new IpV4();
const slider = document.getElementById("slider");
const colSpan = document.getElementById("colSpan");
const refreshButton = document.getElementById("refreshButton");
const decodedText = document.getElementById("decoded");
var sliderValue = 0;

const ipInput = document.getElementById("ipAddress");
const subnetInput = document.getElementById("subnetMask");
const maskedIpAddress = document.getElementById("maskedIpAddress");

const binaryAddressTriggered = document.getElementById(
  "binaryAddressTriggered"
);
const binaryAddressOriginal = document.getElementById("binaryAddressOriginal");
const binarySubnetValueTriggered = document.getElementById(
  "binarySubnetValueTriggered"
);
const binarySubnetValueOrignal = document.getElementById(
  "binarySubnetValueOrignal"
);
const binaryMaskedAddressTriggered = document.getElementById(
  "binaryMaskedAddressTriggered"
);
const binaryMaskedAddressOriginal = document.getElementById(
  "binaryMaskedAddressOriginal"
);
const numericMaskInput = document.getElementById("numericMaskValue");

const addressesValue = document.getElementById("addressesValue");
const hostsValue = document.getElementById("hostsValue");

const display = () => {
  // decodeEffect(decodedText, decodedText.dataset.value);
  colSpan.style.width = `${slider.value * 0.47}rem`;
  ipInput.value = Ip.address.join(".");
  subnetInput.value = Ip.mask.join(".");
  maskedIpAddress.innerText = `${Ip.maskedAddress.join(".")}/`;
  numericMaskInput.value = sliderValue;
  let binaryAddress = Ip.getSlicedBinaryAddress(sliderValue);
  binaryAddressTriggered.innerText = binaryAddress[0];
  binaryAddressOriginal.innerText = binaryAddress[1];
  let binarySubnet = Ip.getSlicedBinaryMask(sliderValue);
  binarySubnetValueTriggered.innerText = binarySubnet[0];
  binarySubnetValueOrignal.innerText = binarySubnet[1];
  let binaryMaskedIpAddress = Ip.getSlicedBinaryMaskedAddress(sliderValue);
  binaryMaskedAddressTriggered.innerText = binaryMaskedIpAddress[0];
  binaryMaskedAddressOriginal.innerText = binaryMaskedIpAddress[1];
  addressesValue.innerText = Ip.getAddressesNumber(sliderValue);
  hostsValue.innerText = Ip.getHostsNumber(sliderValue);
};

numericMaskInput.addEventListener("change", (event) => {
  let value = parseInt(event.target.value);
  sliderValue = value > 32 ? 32 : value < 0 ? 0 : value;
  slider.value = sliderValue;
  Ip.setSubmask(sliderValue);
  Ip.setMaskedAddress();
  display();
});

ipInput.addEventListener("change", (event) => {
  let _address = event.target.value;
  console.log(_address);
  Ip.address =
    ValidateIPaddress(_address, "Bad IP address") && _address.split(".");
  Ip.setMaskedAddress();
  decodeEffect(event.target, Ip.address);
  display();
});

subnetInput.addEventListener("change", (event) => {
  let _mask = event.target.value.split(".");
  Ip.address = ValidateIPaddress(_mask, "Bad Mask") && _mask.split(".");

  Ip.mask = _mask;
  Ip.setMaskedAddress();
  slider.value = Ip.addressToBinary(_mask)
    .join("")
    .split("")
    .filter((x) => {
      console.log(x);
      return x == "1";
    }).length;

  display();
});

refreshButton.addEventListener("click", () => {
  Ip.refreshIp();
  Ip.setMaskedAddress();
  display();
});

slider.addEventListener("input", () => {
  sliderValue = parseInt(slider.value);
  Ip.setSubmask(sliderValue);
  Ip.setMaskedAddress();
  display();
});

display();
