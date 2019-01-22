import React from 'react'
import Layout from 'src/components/layout-mobile-footer'
import theme from 'src/styles/themes.module.scss'
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet";
import Missing from 'src/images/missing_image_2.png'
import Stars from 'src/images/stars.svg'
import kebabCase from "lodash/kebabCase"
//import AniLink from "gatsby-plugin-transition-link/AniLink"
import LazyLoad from "react-lazyload"
import 'src/styles/theme-featured.css'
import Headroom from 'react-headroom';
import 'src/styles/tooltips.css'

// Pass image as css instead of a dom element (img) style={{backgroundImage :  `url(${node.frontmatter.thumbnail})` }}

const FeaturedThemes = (props) => {
  //const tags = props.data.tags;
  const featuredList = props.data.featured;
  const { totalCount } = featuredList;
  const listCount = `${totalCount}`
  
  return (
  <Layout>
    <Helmet>
        <meta charSet="utf-8" />
        <title>BetterDocs | #1 Featured Discord Themes</title>
        <meta property="og:site_name" content="BetterDocs"/>
        <meta property="og:title" content="BetterDocs | #1 Discord Themes"/>
        <meta property="og:description" content="List of free high quality Discord themes by the community! Customize Discord to your own liking with transparent themes and modern themes!"/>
        <meta property="og:url" content="https://betterdocs.us/themes/" />
    </Helmet>
    <div className={theme.themesContainer}
    >
    <section className={theme.contentSection}
    >
    <Headroom>
      <div className={theme.titleBar}>
        <div className={theme.count}>#Themes <span>{listCount} featured themes</span></div>
        <input className={theme.input} placeholder="Search Themes library (WIP)" ></input>
        <a target="blank" href="https://www.youtube.com/watch?v=j_Uc0wZPJSY" data-balloon="Need help with theme installation?" data-balloon-pos="left" className={theme.help}>?</a>
        <Link className={theme.upload}
        data-balloon="Want to publish your theme?" data-balloon-pos="left">
          <svg id='Capa_1' xmlns='http://www.w3.org/2000/svg' width='433.5' height='433.5'
          viewBox='0 0 433.5 433.5'>
              <g id='file-upload'>
                  <polygon points='140.25,331.5 293.25,331.5 293.25,178.5 395.25,178.5 216.75,0 38.25,178.5 140.25,178.5'
                  />
                  <rect x='38.25' y='382.5' width='357' height='51' />
              </g>
          </svg>
        </Link>
      </div>
    </Headroom>

      <div className={theme.mainContent}
        >
          <div className={theme.wrapper}
          >
          {featuredList.edges.map(({ node }, i) => (
            <div 
            className={theme.cardWrapper}
            key={node.id}
            >
              { node.frontmatter.thumbnail ?
              <Link to={"themes" + node.fields.slug} className={theme.imgContainer} alt={node.frontmatter.featured && "featured"}
              >
                <LazyLoad once={true} height="100%"
                  placeholder={<img className={theme.img} alt={node.frontmatter.title} src={Missing} style={{backgroundImage :  `url(${Missing})` }}/>}>
                <img className={theme.img} alt={`The featured theme "` + node.frontmatter.title + `"`} src={node.frontmatter.thumbnail}/>
                </LazyLoad>
                { node.frontmatter.featured &&
                  <Link 
                    to="/themes/featured/"
                   className={theme.icon}
                   data-balloon="Featured" data-balloon-pos="left">
                    <img src={Stars} alt="Featured Theme icon"></img>
                  </Link>
                }
                <div className={theme.options}>
                  <div className={theme.optionsWrapper}>
                    <a 
                    className={theme.btn}
                    href={node.frontmatter.thumbnail}
                    target="blank"
                    >Full Thumbnail</a>
                    {node.frontmatter.demo &&
                    <div
                    href={'http://betterdocs.netlify.com/demo/' + node.frontmatter.style + '.html?theme=' + node.frontmatter.demo}
                    className={theme.btn}
                    target="blank">Quick Demo</div>
                    }
                  </div>
                </div>
              </Link>
              :
              <div 
              className={theme.imgContainer}
              >
                <img className={theme.img} alt={node.frontmatter.title} src={Missing} style={{backgroundImage :  `url(${node.frontmatter.thumbnail})` }}/>
              </div>
              }
                <div>
                  <Link 
                  className={theme.author}
                  to={"/profile/" + node.frontmatter.author}
                  target="blank"
                  >{node.frontmatter.author} /</Link>
                </div>
                <div className={theme.title}
                >
                <Link 
                to={"themes" + node.fields.slug}
                className={theme.titleLink}>
                {node.frontmatter.title}
                </Link>
                </div>
              {node.frontmatter.tags ?
                <div>
                <div className={theme.description}
                >
                  <p className={theme.p}
                  >{node.excerpt}</p>
                </div>
                <div className={theme.tagContainer}>
                  {node.frontmatter.tags.map(tag => (
                    <Link to={`/themes/tags/${kebabCase(tag)}/`} key={tag} className={theme.tag}>
                      #{tag}
                    </Link>
                  ))}
                </div>
                </div>
                :
                <div className={theme.descriptionAlt}
                >
                  <p className={theme.p}
                  >{node.excerpt}</p>
                </div>
              }
            </div>
          ))}
        </div>
      </div>

    </section>

    </div>
    <div className={theme.uploadContainer}>
        <Link to="/themes/upload-a-theme/" className={theme.uploadBtn}>
        +
        </Link>
    </div>
    <div className={theme.helpContainer}>
        <a data-balloon="Need help with theme installation?" data-balloon-pos="left" href="https://www.youtube.com/watch?v=j_Uc0wZPJSY" className={theme.btn} target="blank">?</a>
    </div>
  </Layout>
)
}

export default FeaturedThemes;

export const allFeaturedThemesQuery = graphql`
query allFeaturedThemesQuery {
  allMarkdownRemark(filter: {collection: {eq: "themes"} } sort: { fields: [frontmatter___title], order: ASC}) {
    group(field: collection) {
      fieldValue
      totalCount
    }
    totalCount
    edges {
      node {
        excerpt
        html
        id
        frontmatter {
          title
          sub
          author
          thumbnail
          github_profile_url
          download
          support
          style
          demo
          layout
          description
          date
          featured
          tags
        }
        fields {
          slug
        }
      }
    }
  }
  featured: allMarkdownRemark(filter: {collection: {eq: "themes"} frontmatter: { featured: { eq: true } } } sort: { fields: [frontmatter___title], order: ASC} ) {
    group(field: collection) {
      fieldValue
      totalCount
    }
    totalCount
    edges {
      node {
        excerpt
        html
        id
        frontmatter {
          title
          sub
          author
          thumbnail
          demo
          github_profile_url
          download
          support
          layout
          description
          date
          featured
          tags
        }
        fields {
          slug
        }
      }
    }
  }
}
`