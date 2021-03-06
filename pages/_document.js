import Document, { Html, Head, Main, NextScript } from 'next/document'


 class MyDocument extends Document{

  setGoogleTags() {

      return {
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-BDMFNVR9GG');
        `
    }
  }


    render() {
  return (
    <Html lang='en' >
      <Head>
          <script src="https://kit.fontawesome.com/a31bdd6d95.js" crossOrigin="anonymous"></script>
          {/* <link rel="stylesheet" href="./style.css" ></link> */}
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />
                <script  src="https://apis.google.com/js/api.js"></script>
          <script dangerouslySetInnerHTML={this.setGoogleTags()} />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-BDMFNVR9GG"></script>
    

      </Head>
      <body style={{width:"98%"}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
    }
}

export default MyDocument;