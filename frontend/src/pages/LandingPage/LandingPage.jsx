import React from "react";
import {
  logo,
  semicircle,
  triangle,
  figure,
  Link,
  BackgroundBlurOrange,
  BackgroundBlurBlue,
} from "../../../constant";
import "./LandingPage.css";
import ThemeToggle from "../../../components/themes/themes";
const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="nav-bar">
        <div className="logo-name">
          <img src={logo} alt="" />
          <div>FormBot</div>
        </div>
        <div className="signIn-create-formBot">
          <button className="sign-in-button">Sign in</button>
          <button className="create-formBot-button">Create a FormBot</button>
        </div>
      </div>
      <ThemeToggle />
      <div className="top-banner">
        <img src={triangle} alt="" className="triangle" />
        <div className="banner-details">
          <div className="line-top">Build advanced chatbots visually</div>
          <div className="middle-line">
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them anywhere on your web/mobile apps and start collecting
            results like magic.
          </div>
          <button className="create-formBot-button-above-banner">
            Create a FormBot for free
          </button>
        </div>
        <div>
          <img src={semicircle} alt="" className="semicircle" />
        </div>
      </div>

      <div className="banner-landing-page">
        <div>
          {/* <img src={BackgroundBlurOrange} alt="" className="orange" /> */}
        </div>
        <img src={figure} alt="" className="image-landing-page" />
        <div>
          {/* <img src={BackgroundBlurBlue} alt="" className="blue" /> */}
        </div>
      </div>
      <div className="footer">
        <div className="logo-author">
          <div className="logo-name">
            <img src={logo} alt="" />
            <div>FormBot</div>
          </div>
          <div>Made with ❤️ by</div>
          <div> @cuvette</div>
        </div>
        <div className="products-info">
          <div className="product-title">Product</div>
          <div>
            Status <img src={Link} alt="" />
          </div>
          <div>
            Documentation <img src={Link} alt="" />
          </div>
          <div>
            Roadmap <img src={Link} alt="" />
          </div>
          <div>Pricing</div>
        </div>
        <div className="community-info">
          <div className="community-title">Community</div>
          <div>
            Discord <img src={Link} alt="" />
          </div>
          <div>
            GitHub repository <img src={Link} alt="" />
          </div>
          <div>
            Twitter <img src={Link} alt="" />
          </div>
          <div>
            LinkedIn <img src={Link} alt="" />
          </div>
          <div>OSS Friends</div>
        </div>
        <div className="company-info">
          <div className="company-title">Company</div>
          <div>About</div>
          <div>Contact</div>
          <div>Terms of Service</div>
          <div>Privacy Policy</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
