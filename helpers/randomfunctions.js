export function getRandomNumber(min, max) {
    // console.log("min, max",typeof min, typeof max, min, max);
    const randomNum = Math.random();
    // console.log("randomNum", typeof randomNum, randomNum);
    const randomNumberInRange = Math.floor(randomNum * (max - min + 1)) + min;
    
    // console.log("1",(max - min + 1));
    // console.log("2",(randomNum * (max - min + 1)));
    // console.log("3",Math.floor(randomNum * (max - min + 1)));
    // console.log("4",min);

    // console.log("randomNumberInRange",typeof randomNumberInRange,randomNumberInRange);
    return randomNumberInRange;
}
