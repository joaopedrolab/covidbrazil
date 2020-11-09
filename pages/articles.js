import matter from 'gray-matter'

import Layout from '../components/Layout'
import BlogList from '../components/BlogList'

import styles from '../styles/Articles.module.css'
import stylesGeneral from '../styles/Styles.module.css'


export async function getStaticProps() {
  const siteConfig = {
    "title": "Covid Brasil Title",
    "description": "Uma plataforma",
    "APP_NAME": "Covid Brasil",
    "APP_DESCRIPTION": "Uma plataforma, que recebe, em tempo real, dados sobre casos epidemiológicos"
  }

  //get posts & context from folder
  const posts = (context => {
    const keys = context.keys()
    const values = keys.map(context)
    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const value = values[index]

      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      }
    })

    return data

  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      allBlogs: posts,
      title: siteConfig.title,
      description: siteConfig.description,
    },
  }
}


export default function Index(props) {
  return (
    <Layout name="/ Artigos" svg="articles">
      <h1 className={stylesGeneral.title}>Artigos</h1>

      <BlogList allBlogs={props.allBlogs} />
    </Layout>
  )
}
