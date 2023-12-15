//Создаем кастомный хук для вывода страниц
import { useMemo } from "react"
import { getPagesArray } from "../../utils/pages"

export const usePagination = (totalPages) => {
    const pagesArray = useMemo(() => {
        const getArray = getPagesArray(totalPages)
        return getArray
     }, [totalPages])

     return pagesArray
}