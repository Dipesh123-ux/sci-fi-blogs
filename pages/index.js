import Layout from "../components/layout";
import Link from "next/link";

const Index = () => {
  return (
    <div>
    <Layout>
      <article className="overflow-hidden">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-4 font-weight-bold main-head">
                SCI-FI BLOGS
              </h1>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center pt-4 pb-5">
              <p className="lead sub-head">
                 All your favourite science fiction movies and series blogs are together at one
                place
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row tt">
            <div className="col-md-4">
              <div className="c">
                <div class="card-header">
                  <img
                    src="/1_HcRuVYDrcjvOKhiEHbAV2w.png"
                    alt="rover"
                  />
                </div>
                <div class="card-body">
                  <span class="tag tag-teal">Christopher Nolan</span>
                  <span style={{ color: "black" }} class="tag t-one">
                    #science fiction
                  </span>
                  <Link href="/blogs">
                    <h4 class="card-link mt-4">
                      Why is the Tesla Cybertruck designed the way it is?
                    </h4>
                  </Link>

                  <p>An exploration into the truck's polarising design</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div class="c">
                <div class="card-header">
                  <img src="/1224268.jpg" alt="rover" />
                </div>
                <div class="card-body">
                  <span class="tag tag-teal">Marvel</span>
                  <span style={{ color: "black" }} class="tag t-one">
                    #moon_knight
                  </span>
                  <Link href="/blogs">
                    <h4 class="card-link mt-4">
                      Moon Knight Is Unlike Any Other Superhero Show
                    </h4>
                  </Link>
                  <p>
                    Going into Moon Knight, I had few expectations. I wasn’t
                    familiar with the character. All I knew about .
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div class="c">
                <div class="card-header">
                  <img
                    src="/MV5BODZlYjQ4NzYtZTg1MC00NGY4LTg4NjQtNGE3ZjRkMjk3YjMyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UY1200_CR165,0,630,1200_AL_.jpg"
                    alt="rover"
                  />
                </div>
                <div class="card-body">
      
                
                  <span class="tag tag-teal">Netflix</span>
                  <span style={{ color: "black" }} class="tag t-one">
                    #stranger_things
                  </span>
                  <Link href="/blogs">
                    <h4 class="card-link mt-4">
                      We Need to Talk About the Stranger Things Season 4
                    </h4>
                  </Link>
                  <p>
                    Vecna gets a horrifying origin story, Hopper battles a
                    familiar foe, and the kiddos learn more about the Upside
                    Down.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
    </div>
  );
};

export default Index;
