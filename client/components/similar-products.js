import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api/index";
import { Media } from "/lib/collections/index";
// import ProductsGallery from "./products-gallery";

// Create your component
class SimilarProducts extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    productMedia: PropTypes.func
  }

  handleClick = (event) => {
    const handle = event.currentTarget.dataset.id;
    Reaction.Router.go("product", { handle });
  }

  render() {
    const { products } = this.props;
    if (products && products.length > 0) {
      const mediaMap = {};
      products.map((product) => {
        const media = Media.find({
          "metadata.productId": product._id
        }, {
          sort: {
            "metadata.priority": 1
          }
        }, { limit: 1 }).fetch();
        if (media && media[0]) {
          mediaMap[product._id] = media[0];
        }
      });
      return (
        <div className="similar-block">
          <div>
            <h3 className="similar-heading">
              <Components.Translation defaultValue="You might also like" i18nKey="productDetail.similar" />
            </h3>
          </div>
          <div className="products-scroll">
            {products.map((product, index) =>
              <Components.ProductGridItems
                {...this.props}
                showFeaturedLabel={false}
                product={product} index={index}
                media={() => this.props.productMedia(index)}
              />
            )}
          </div>
        </div>
      );
    }
    return null;
  }
}

// Export component if you also want to use it in other places in the App
export default SimilarProducts;