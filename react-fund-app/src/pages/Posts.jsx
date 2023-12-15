//В этом файле будет основная страница приложения
import React, { useEffect, useState, useRef } from "react"
import {usePosts} from "../components/hooks/usePosts"
import {useFetching} from "../components/hooks/useFetching"
import PostService from "../API/PostService"
import { getPageCount } from "../utils/pages"
import MyButton from "../components/UI/button/MyButton"
import MyModal from "../components/UI/MyModal/MyModal"
import PostForm from "../components/PostForm"
import PostFilter from "../components/PostFilter"
import PostList from "../components/PostList"
import Pagination  from "../components/UI/pagination/Pagination"
import Loader from "../components/UI/Loader/Loader"
import '../styles/App.css'
import { useObserver } from "../components/hooks/useObserver"
import MySelect from "../components/UI/select/MySelect"


function Posts() {
  //Создаем массив постов
  const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort: '', query: ''})
  //Реализуем состояние видимости модального окна
      const [modal, setModal] = useState(false)

      const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  //Создадим состояние в которое будем помещать общее количество постов
        const [totalPages, setTotalPages] = useState(0)


  //Получаем ссылку на последний DOM-элемент в списке
        const lastElement = useRef()

  //Создадим состояние для лимита и для номера текущей страницы
            const [limit, setLimit] = useState(10)
            const [page, setPage] = useState(1)


  //Формирование страниц с помощью КАСТОМНОГО хука usePagination
            
            
      // let pagesArray = getPagesArray(totalPages)

      // console.log([pagesArray])
  //Реализуем действие нашего хука
      const [fetchPosts, isPostsLoading, postError ] = useFetching( async(limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data]) 
        console.log(response.headers['x-total-count'])
        const totalCount = (response.headers['x-total-count'])
        setTotalPages(getPageCount(totalCount, limit))

      })

  //Используем наш кастомный хук для бесконечной ленты
      useObserver(lastElement, page < totalPages, isPostsLoading, () => {
          setPage(page + 1)
      })


  //Реализуем действие хука useEffect
  useEffect(() => {
      fetchPosts(limit, page)
  }, [limit, page])

  //Реализуем создание нового поста по клику кнопки
    const newCreate = (newPost) => {
      setPosts([...posts, newPost]);
      setModal(false)
    }


  //Реализуем функцию удаления поста, получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

    const changePage = (page) => {
          setPage(page)
    }
 
    return (
      <div className="App">
        <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
            Создать пост/заметку
        </MyButton>
          <MyModal visible={modal} setVisible={setModal} >
              <PostForm create={newCreate} />
          </MyModal>
          {/* Реализуем сортировку наших постов */}
          <hr style={{margin: '15px 0'}}/>
          <PostFilter
           filter={filter}
           setFilter={setFilter}
          />
          <MySelect
              value={limit}
              onChange={value => setLimit(value)}
              defaultVelue='Кол-во элементов на странице'
              options={[
                  {value: 5, name: '5'},
                  {value: 10, name: '10'},
                  {value: -1, name: 'Показать все посты'},
              ]}
          />
          {postError && 
            <h1>Произошла ошибка ${postError}</h1>
          }
          {/* Осуществляем ползунок загрузки и бесконечную ленту */}
          <PostList remove={removePost} posts={sortedAndSearchedPosts} title='List of Posts'/>
          <div ref={lastElement} style={{height: '20px', background: 'red'}}/>
          {isPostsLoading &&
             <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px', flexDirection: 'column', alignItems: 'center', gap: '15px'}}><Loader/>Посты загружаются</div>
          }
          <Pagination
           page={page}
           changePage={changePage}
           totalPages={totalPages}
          />
      </div>
    );
}

export default Posts;


