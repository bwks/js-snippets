/* 
Most of the code here was found at the below link:
https://tech.mybuilder.com/determining-if-an-ipv4-address-is-within-a-cidr-range-in-javascript/
*/

// Convert IPv4 address to an integer
const ip4ToInt = ip =>
  ip.split('.').reduce((int, oct) => (int << 8) + parseInt(oct, 10), 0) >>> 0;

// Convert Integer to IPv4 Address
const intToIp4 = int =>
  [(int >>> 24) & 0xFF, (int >>> 16) & 0xFF,
   (int >>> 8) & 0xFF, int & 0xFF].join('.');

// Get the First and Last IPv4 addresses from an IPv4 CIDR
const calculateCidrRange = cidr => {
  let [range, bits = 32] = cidr.split('/');
  let mask = ~(2 ** (32 - bits) - 1);
  return [intToIp4(ip4ToInt(range) & mask), intToIp4(ip4ToInt(range) | ~mask)];
};

// Return an array of usable IPv4 Addresses in a CIDR
const IpsInRange = (first, last) => {
    let all = []
    firstInt = ip4ToInt(first)
    lastInt = ip4ToInt(last)
    // /32 prefix
    if (firstInt === lastInt) {
        return [first]
    // /31 prefix
    } else if (firstInt+1 === lastInt) {
        return [first, last]
    // /30 or lower prefix
    } else {
        for (let i = 1; firstInt + i < lastInt; i++) {
            all.push(intToIp4(firstInt + i))
        }
        return all
    }    
}

/* Usage
[first, last] = calculateCidrRange('192.168.0.0/23');
IpsInRange(first, last);

[first, last] = calculateCidrRange('192.168.0.1/32');
IpsInRange(first, last);

[first, last] = calculateCidrRange('192.168.0.0/31');
IpsInRange(first, last);

[first, last] = calculateCidrRange('10.0.0.0/29');
IpsInRange(first, last);
*/
