//Работа с номерами страниц JSON предоставляет 2 параметра limit и page
//utils для вспомогательных функций


//Реализуем функцию для подсчета необходимого количества страниц
export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages) => {
    let result = []
    for(let i = 0; i < totalPages; i++ ){
        result.push(i + 1)
    }
    return result;
}