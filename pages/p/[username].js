import Head from 'next/head'
import styles from '../../styles/User.module.css'
import Search from '../../components/Search'
import Post from '../../components/Post'
import * as PostEx from '../../Users'
import * as users from '../../Users'
import Layout from '../../layouts/Layout'
import PostFeed from '../../components/PostFeed'
export default function User({user, posts}) {
  const classesR = `${styles.sticky} ${styles.right}`
  const classesL = `${styles.sticky} ${styles.left}`
  
  return (
    <Layout>
      <Head>
        <meta property="og:title" content={`${user.displayName} (@${user.username})`} />
        <meta property="og:description" content={user.bio ? user.bio : 'This user has no bio'} />
        <meta property="og:image" content={user.avatar ? user.avatar : '/logo_circle.png'} />
        <title>{`${user.displayName} (@${user.username})`} - Aperii</title>
      </Head>
      <div className={styles.user}>
        <div className={styles.banner}>
          <img className={styles.avatar} src={user.avatar ? user.avatar : '/av.png'}></img>
        </div>
        <p>Hello, {user.username}</p>
      </div>
      <PostFeed posts={posts}></PostFeed>
    </Layout>
  )
}


export async function getServerSideProps(context) {
  var res = await fetch('https://aperii.com/api/v1/profiles/' + context.params.username, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: context.req.cookies.token
    }
  })
  var user = await res.json()

  if(user.status){
    user = {
      displayName: 'User not found',
      username: '404'
    }
  }
  
  return {props: {user, posts: user.posts}}
  
}
