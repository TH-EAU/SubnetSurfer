// const numberToBinary = (number) => {
//   const binaryString = (number >>> 0).toString(2);
//   const paddedBinary = binaryString.padStart(8, "0");
//   return paddedBinary;
// };

function ValidateIPaddress(ipaddress, message = "bad entry") {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }
  alert(message);
  return false;
}

const sliceBinaryIpAddressString = (address, slicer) => {
  let i = (j = part = 0);
  let slicedStr = ["", ""];
  while (i < address.length) {
    if (address[i] != ".") j++;
    slicedStr[part] += address[i];
    if (j > slicer) part = 1;
    i++;
  }
  return slicedStr;
};

class IpV4 {
  address = [];
  mask = [];
  maskedAddress = [0, 0, 0, 0];
  constructor(bitCount) {
    this.refreshIp();
    this.setSubmask(0);
  }

  refreshIp = () => {
    let _address = [];
    for (let i = 0; i < 4; i++) {
      _address.push(Math.floor(Math.random() * 256));
    }
    this.address = _address;
  };

  setSubmask = (bitCount) => {
    let _mask = [];
    for (let i = 0; i < 4; i++) {
      const n = Math.min(bitCount, 8);
      _mask.push(256 - 2 ** (8 - n));
      bitCount -= n;
    }
    this.mask = _mask;
  };

  addressToBinary = (address) => {
    return address.reduce((acc, val) => {
      acc.push((val >>> 0).toString(2).padStart(8, "0"));
      return acc;
    }, []);
  };

  setMaskedAddress = () => {
    const ipParts = this.address.map(Number);
    const subNetParts = this.mask.map(Number);
    this.maskedAddress = ipParts.map(
      (part, index) => part & subNetParts[index]
    );
  };

  getSlicedBinaryMaskedAddress = (slicer) => {
    return sliceBinaryIpAddressString(
      this.addressToBinary(this.maskedAddress).join("."),
      slicer
    );
  };

  getSlicedBinaryAddress = (slicer) => {
    return sliceBinaryIpAddressString(
      this.addressToBinary(this.address).join("."),
      slicer
    );
  };

  getSlicedBinaryMask = (slicer) => {
    return sliceBinaryIpAddressString(
      this.addressToBinary(this.mask).join("."),
      slicer
    );
  };

  getAddressesNumber = (subnetBits) => 2 ** (32 - subnetBits);

  getHostsNumber = (subnetBits) => {
    let addresses = 2 ** (32 - subnetBits);
    return addresses - 2 < 1 ? 1 : addresses - 2;
  };
}
