function ChangeTotalTimePrice(getDatafromArr, checkArr){
    const TimeTot = getDatafromArr.reduce((result, num) => result + num.time, 0)
    const PriceTot = getDatafromArr.reduce((result, num) => result + num.price, 0)

    checkArr.map(checkArr => {
        checkArr.time = TimeTot
        checkArr.price = PriceTot
        return checkArr
    })
}

export default ChangeTotalTimePrice