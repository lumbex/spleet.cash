
const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true,
            modalOpen: false,
        }
    },

    created() {
        this.$nextTick(() => {

            var windowWidth = window.innerWidth;
            var horizontalLength = document.querySelector(".element-wrapper").scrollWidth;
            var distFromTop = document.querySelector(".horizontal-section").offsetTop;

            document.querySelector(".horizontal-section").style.height = horizontalLength + "px";
            var scrollDistance = distFromTop + horizontalLength - windowWidth 
            console.log(scrollDistance);

            window.onscroll = function(){
                var scrollTop = window.pageYOffset
                if (scrollTop >= distFromTop && scrollTop <= scrollDistance){
                document.querySelector(".element-wrapper").style.transform = "translateX(-" +(scrollTop - distFromTop) +"px"
                }
            }

            if (this.$refs.myRef) {
              console.log("Now it does!");
            }

            
          });

        // twttr.widgets.createShareButton(
        //     "https:\/\/dev.twitter.com\/web\/tweet-button",
        //     document.getElementById("tweet-container"),
        //     {
        //       size: "large",
        //       text: "custom share text",
        //       hashtags: "example,demo",
        //       via: "twitterdev",
        //       related: "twitterapi,twitter"
        //     }
        //   );
    },
    methods: {
        openModal() {
            this.modalOpen = true;
        },
        closeModal() {
            this.modalOpen = false;
        },
        updateCart(id) {
            this.cart.push(id)
        }
    }
})

// app.use(VueSocialSharing.default)
