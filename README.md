# E-Com Deploy
 
E-commerce 
React app 04/09/2023. =>
Features-  Good SEO using Helmet and Slugify package.(both have diff roles)
           Private routes,Nested Routes.
           Forgot Password.
           Admin and user dashboard with private and public routes
           Admin Panel for create product, product section and update/delete product.
           Filters , search box filter(context api) {Read carefully, datee- 14/09/23}
           Product Page , and similar Product page.
           Payment gateway ( useing braintree sandbox) - We also check if user is logged in or not, cart is empty(then no transaction) [18th,19th date].

//colors have been imported to show diff things in diff colors,like error in red in terminal, basically highlighting links, error etc (.bgRed.white)
//to import react use rafce(react arrow function with export).
// Helmet allows to add Title to every page, slugify allows better URLs(-).

1. Using env file for keeping private info like PORT, keys etc.
2. Mongoose for db and morgan to show api requests.
3. bcrypt for safety of password.
4. We have different routes for diff activity =>

  Config - has db.js which connects mongodb from url(atlas site).
           URL is stored in env file and is connected by conn method.

  Models- has userModel.js which has the structure of info required from a user.
          it is exported to users db with method - mongoose.model('users',userSchema)

  Helpers- has authHelper.js which has the password structure , how many attempts, used           bcrypt so  that password is safe.

           has another const to compare the password.

  Controller-  has authController.js

             Imports of password from authHelper and userModel
             Validation done for if feild is left empty.
             extra validation done , so that if user is already registered, then send message to login directly.
             Saving/registering the user by storing password in hashedPassword.
             saved the password by creating new UserModel and storing password:hashedPassword.save() // this saves the info to the userModel.

 
  Routes- has authRoute.js
          imported registerController from authController
          route has been set for our rest api user model by- router.post('/register',registerController) // callback is of registerController which is the full validation of userModel.

              
-------------------------------------------------------------------------------------------
05/09/2023
1.JWT controller  2. Login route, Login Validation
2. Checked email, pass validation on Postman.
3. Midddleware - authMiddleware.js
   "Req" will be sended ,"next" will be validated, then "response" will be sent back.
4. Authorization Token added
//we async functions while comparing some elements, await is to check promises passed are validated or not.
5. 2 middlewares created one for  token and admin.
6. Client Folder made via React
7.Components>Layout Made which has Layout,Header,Footer.
8. Pages made. it has home page, contact about etc.

//Learning- to convert to jsx code- ctrl+alt+x 
            to select same letter ctrl+d
 1:48:56
-------------------------------------------------------------------------------------------
06/09/2023
1. Client Setup
   Header, footer, about,contact etc pages were made.
   In header navbar was made of responsive bootstrap.
   React-router-dom was imported it gives Link and navLink which enables the elemnt in nav to be clickable and also direct to certain path using (to="/").
   

2. SEO(searc engine optimization) improved by importing Helmet.
   It has to be improved by using meta tags and giving title discription etc.
   It was copied inside Layout.js , and then used 'title' inside every page in <Layout />

3. toaster was imported from react-hot-toast to get custom messsages for success/error.
4.useNavigate was imported from react router dom to navigate to diffrent pages.
  It has toused in index.js(import as Browserrouter) and then use app inside <BrowserRouter>

Also, (Routes,route) has to be imported in app.js and then import all pages.
          and path of evry page is recognized as-
                        <Routes>
    <Route path="/" element={<HomePage />}  />    </Routes>


5.axios was used  to setup our rest api, it used the (prebuild path of server.js) and the elements to be sent like name,password etc. 

6. To use react icons import it from site and 

import {BiLogoGmail,BiSolidPhoneCall} from "react-icons/bi";
                         use the first 2 letters after /

and use icon as - <BiSolidPhoneCall />
                                                              2:53:53
---------------------------------------------------------------------------------------
07/09/2023

Goal 1- when user is logged in, then logout option should be there and login/register should disappear.
Using Context Api(it is only good for small scale applications, Redux toolkit is far more better).
import { useState,useEffect,useContext,createContext } from "react";

1. Created new file auth.js
2. Created hook AuthProvider which has auth and setAuth,its useState is userand token.
3. Created a custom hook useAuth(every hook starts with 'use').Used this is in homepage to get current login data.

4. In login.js used this custom hook again,and stored in in local storage using localStorage.setItem('auth', JSON.stringify(res.data));

   seAuth was defined above it , used spread operator to use data of auth and took user info via user:res.data.user and token also =res.data.token.


              setAuth({
                        ...auth,
                        user:res.data.user,
                        token:res.data.token,
                    });
                    localStorage.setItem('auth',JSON.stringify(res.data));
5. In index.js used AuthProvider <AuthProvider> </AuthProvider>
6. Used json.parse to send the data. This helps home Page to store data even after refresh and it knows who has logged in.

7.Done Conditional Rendering for showing Register/Login Button , if !auth.user then show signup/login , : Logout .
  
  In logout gave a onClick={handleLogout} which setAuth - auth:null, token:'' and localstorage.removeItem('auth').

So, our 1st goal is acheived.

Goal 2- To create private and public route(private routes , like user dashboard which is only accesible to a particular user).
       If we are logged in only then we can access the dashboard page.

In routes(server) - we create new route for user_dashboard and set a req,res func which passes {ok:true}

1.In src > components > routes > Private.js

PrivateRoute (private.js):

Libraries Used: React, useEffect, useState, axios (for making API requests), react-router-dom (for routing), useAuth (custom authentication context), Spinner (a loading component).
Summary: This component is a private route that checks if the user is authenticated. It uses the useAuth custom context to get the user's authentication token. When the component mounts, it makes an API request to /api/v1/auth/user-auth to verify the user's authentication status. If authenticated, it renders the Outlet, allowing access to the protected dashboard. Otherwise, it displays a loading spinner (Spinner.js) while redirecting the user to the login page.

Spinner (Spinner.js):

Libraries Used: React, useEffect, useState, useNavigate (from react-router-dom), useLocation (from react-router-dom).
Summary: This component displays a loading spinner with a countdown timer. It is used to provide a visual indication to the user that they are being redirected. The count state is initially set to 5 and decreases every 1.5 seconds. When the countdown reaches 0, it uses useNavigate to redirect the user to the login page with the previous location state.

In app.js Nested route is used-
<Route path="/dashboard" element={<PrivateRoute />} >

    <Route path="" element={<Dashboard />}   />
</Route>

Goal 3- Last Goal Today - Change password functionallity.

1.Forgot Password Controller was made, which first checks if the value is given in feilds or not.
2.Then it checks email and answer(answer is the new thing passwed to set new psw.
3.The newPassword is passed in the helper to function hashPassword which encodes the psw.
  we use- userModel.findbyandUpdate(user._id,password:hashed) , here we set the value of password to new Password.
4.Inside Pages> ForgotPassword.js, we pass on email, answer and newPassword to our rest api.
  Value of input feilds is set to answer and newpassword && onClick is set to setAnswer and setNewPassword.

So, validation is done.
                                                                  3:52:26
--------------------------------------------------------------------------------------
08/09/2023
Goal 1 - To get dashboard and logout option in 1 dropdwon menu and also display name of active user.

1. In the toggle item we set the name to - auth?.user?.name, this means if auth is found ,check user, if both found show name.
2. Then we added 2 dropdowns(logout,dashboard), setting path of each via <Navlink to="/" function.

Goal 2- Admin and user dashboard with private and public routes
1. Routes> Admin route.js was created whose address was set to admin-auth.
   In authRoute we pass 2 middleware for this address, requireSignIn and isAdmin.
   In app.js nested route is made for Admin dashboard page, and there was already for user, their path was specified with /admin and /user.

Goal 3- Creating Admin panel and User Panel
1. Admin Dashboard was created in Page>Admin. Admin menu, createCategory, Create product ,users also.
2.User dashboard was made in Page>user. Orders and profile section was made.
3. Nested routes were addd to app.js for the specific user and admin panel.
                                                       4:19:51
-----------------------------------------------------------------------------------
10/09/2023

Use of slugify package to use (-) insted of (/) in URLs , this is done for better SEO.

Goal 1- To make category model and API.
1.Made model scehma using mongoose for category and used slugify in categoryController for better URL.
2. Then we create route ("/create-category") and pass middlewares and controllers for validation like - requireSignIn,isAdmin,createCategoryController.
3. Then we make category controller. were we check the name (created i model) is passed or not.
   Then check if its passed then a category exists or not, if exists say "already exists" , if not then create new category. Use trycatch.
 
Goal 2- Updation of category and making its route and api.

1. We make updatecategory controller which is async function with callback.
   We also make its new route with PUT method(to only update single element).

2.We use try catch. We get name and id(req.params) and then use ( findByIdandUpdate () ).
3.Herewe have to pass the id , the slug to be updated.
4. We also have to pass {new: true} to make to recognize. (mandatory).
5. then just pass message that category is updated.

Goal 3- To GET All category.
1.Make route for it,and pass no middlewares as it is be accessed by users also.
2. use find method to get model from categorlModel.
3.use trycatch.

Goal 4- Get single category.
1. Make route with no middleware.
2.Use FindOne method as we need single category and also use Slug to get info of category.

Goal 5- Delete category.
1.Make route with middlwares as only admin should delete them. Use id in route to delete.
2. Use findById and delete .

Category CRUD(create, read, uupdate and delete) is done today.

---------------------------------------------------------------------4:51:41.-------------
11/09/23
GOAL - PRODUCT CRUD and learning about formidable package.

Goal 1 - Create Product Api CRUD

1. ProductModel is created, where category was fetched from Category Schema like this - category:{
    type:mongoose.ObjectId,
    ref:'Category'.

Photo has been used as data:Buffer.

2. we cant directly use photo so we have used a package call formidable in routes.
   Formidable is used to directly get all feilds and files without using req.body.

   For normal feilds we use req.feilds in controller-
   const {name,slug,description,price,category,quantity,shipping}= req.fields
   
   For Files(photos etc) we use -     const {photo}=req.files

3.Then we make product controller , we do validation that if name, desc etc not given, error message.
   For photo we check if file is not more 1mb ( atlas allows almost 16mb only in total,so limiting).
   
   For photo we take extra if statement to use it in 'fs' module, so that its path and type is traced.

   Then we await and save the products.

4. We use postman to add products (form-data) || POST || pass all feilds, use objectId in category, and file type in photo.
---------------------
Goal 2- Get products.
1. We get the feilds of prodcuts using find(). 
2. We create a filter for (photo) using select ("-photo"), because we will render photos diffrently or else it will take lot of execution time.
3.We set the limit to 12 products at a time to decrease execution time.
4..sort({createdAt: -1}): It sorts the retrieved documents by the "createdAt" field in descending order, meaning the most recently created products will appear first in the result.

const products= await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1})
    res.status(200).send
---------------------------
Goal 3 - Get single product.

1. Get single product by creating new route and should get acc to slug then use findOne and pass the slug.
2. To extend category(show all details and not just objectId) we use populate("category").

---------------------------
Goal 4 - To get photo from other route(optimizng execution speed).

1. Create new route.  Use product ID to get photo.
2. in product controller use findbyId (req.params.pid).select("photo")  This will only select the photo and not other info.
3. Pass if statement for if (product.photo.data) is received  then set contentType to the data).

--------------------------
Goal 5- Create delete route.

1. Create route use pid.
2. use findbyandDelete(req.params.pid) to delete.

-------------------------
Goal 6 - Update Product
1. make diff route use PUT method and pass pid
2. Use to same code for creating product, just change it to findbyIdandUpdate.
3. Pass the pid, slug , and req.fields.
4. Also add {new:true} , this is mandatory to use while opting for method                                  findbyidandUpdate. This recognizes it as new data.
------------------------------------------------------------------------------------------
12/09/23

Goal 1 -  Admin to get created categories in the admin dashboard panel.
1.In admin folder we make new file CreateCategory.js.
2.We make cons getAllCategory which is an asnyc function and gets data using axios url(get-category).

3.We have used useState as categories and setCategories. When data is retrived from url setCategories is used to pass on the data to categories.

  const {data}= await axios.get('/api/v1/category/get-category')
  if(data.success){
    setCategories(data.category);
  }

4.In  return statement we create a div and make a table which gets the name of category and has edit and delete option.
5.We use categories.map to use the data of category was set by setCategory into the table.
6.We make diff rows for these data.
---------------------
Goal 2- To make a form to add new category by admin.
1.In components folder we make new folder called form and has file CategoryForm.js.
2. here we make a form to get admin input using events.

3.We use it as a react component <CategoryForm /> inside our table.

4. We make handleForm function where we use axios post method to add the name.
5. We had created the hook about with name,setName , and passsed name with axios url.

  const {data} = await axios.post('/api/v1/category/create-category',{name})
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategory();
      } 
 
6. when CategorForm is used as react component value={name} has been passed and handlesubmit has also been passed.

<CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
----------------------

Goal 3- working of edit and delete button using css library ant design.

1. UPDATE -
   We create hook visible, setVisible and initiall sets its state to false.
   We create hook updateName, setUpdateName and set its state to empty.

So, in Edit button onClick we set , setVisible to true and setUpdateName to - c.name(we used "c" to map categories ) . So this updates the name.

 <button className='btn btn-primary ms-2' onClick={()=> 
     {setVisible(true);
      setUpdatedName(c.name);
      setSelected(c)
      }}>
       Edit </button> 

2. In CategoryForm component we we set its value to updatedName and handleSubmit to handleUpdate.

3.In handleUpdate we access the update-category url we set in routes using axios and use PUT method.
  we also pass on ("id").

  To clear input field and then get updated category list we use - 
  
const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name:updatedName})
    if (data.success){
      toast.success(`${updatedName} is updated`)
      setSelected(null)   //To clear input field
      setUpdatedName("")
      setVisible(false)
      getAllCategory();    //to get the updated value
    } 

DELETE- 
 1. Here we use almost same functionallities like update, in its button we pass on (c._id), so that directly object is deleted.
 2. We use delete method and pass (pId) in axios url(url is set in routes).

-------------------------------------------------------------------------------------------
13/09/23

Goal 1- To make products , add them using a form.

1.In admin we created createProduct.js.
2.The product model had various fields like name,description, catageory, price quantitty etc.
  We made states(hooks) for all off them.
3. In the forms we used the setter func of the hooks to capture event.target.value and so this hooks data was updated.

4.To submit this form we had onClick func handleCreate.
  Here the hooks setter func was passed to each field and axios post method was used to pass the values to the create-product URL and passed the const- (productData) [All fields was inside this].

-------------------

Goal 2- To make products page and show all the products which are created.
1. In admin we make new file Product.js.
2. Here we destructure {data} by using hooks to set the value from axios url(get method) .
  
const { data } = await axios.get("/api/v1/product/get-product");
setProducts(data.products);

3. As me used hooks to get this data, we passed the value of each field in a bootstrap card which shows the product using mapping.

-------------------

Goal 3- To update product.
1. In admin make new file as updateProduct.js.
2. Similar To create Product , we copy the code and change the hooks.
3. To get a single product -  we destructure data again and this time pass the slug, so that single product is fetched.

 const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );

  Then use the setter func of hooks to set the data for states.
   example-   setName(data.product.name);

4. In the update form we use this setter func of hooks to set the new input(event.target.value).

5.Onclick button has func called handleUpdate , this is similar to create product this time we use PUT method in axios just to target the single product,

----------------

Goal 4- Delete the product
1. In the updateProduct file we add a button with onClick= handleDelete
2. In handle Delete we use axios.delte method and pass the pid.
3. To avoid accidental delete , we added windows prompt for confirming.

------------------------------------------------------------------------------6:54:30
14/09/23
Goal 1 - To display Products on homepage.
1.Made const for getAllProducts and used axios.get to get the get product url.
2.Then used lifecycle method.
3. Then copied card component from product.js.

Goal 2- To show list of filters of categories and price,we use ant design because there we can select multiple categories.

FILTER BY CAT-
1. Use map to map the name of categories.
2. Make hook as category and setCategory
3. Use Checbox of antdesign and give it a key as ID.
4. In the checkbox , onChange should have funnc called handleFilter which catches events(e.target.checked)
5. We make handleFilter, where we use spread op for (...checked).
   we push id in checked.
   Then use hook (setCategory) to store the  value.

 
  //filter by category
const handleFilter =(value,id) => {
  let all = [...checked]
  if(value){
    all.push(id)
  } else{
    all= all.filter(c => c!== id)
  }
  setChecked(all)

FILTER BY PRICE -
1. We make new page in component as prices.js.
2. Where we make a model for prices, by giving them id and range.
3. Then we make hook as radio,setRadio
4. Then use Radio by ant design, and pass (e.target.value) to hook (setRadio).
5. Then we map value of array in Prices.

   {/* filter by price */}
<h4 className='text-center mt-4'>Filter By Price</h4>
<div className='d-flex flex-column'>
<Radio.Group onChange={e => setRadio(e.target.value)}>
{Prices?.map(p=>(
  <div key={p._id}>
  <Radio value={p.array} > {p.name}</Radio>
  </div>
))}

</Radio.Group>



Goal 3 (MAIN GOAL) - To filter products 
1. We create filter route in productRoutes.
2. Then we make its controller in productController
3. We destructure (checked and radio) and gets its data by req.body.
4. Then we create a condition called args which uses mongo greater and lesser oper to check length of product, then we send the args data to our product model.

5. in Home page we create func called filter product and use POST method for the route made and pass on the (checked,radio) and use the earlier made hook setProduct to store the data.

6. Then we use lifecycle method(useEffect) to pass on filterProuduct func while checkin the length of list or radio.

-----------------------------

Goal 4 - To limit the page and convert to multiple pages to avoid api overload.(pagenation)
Pagination:

Product Count Controller:

This controller function (productCountController) calculates the total count of products in the database.
It uses the estimatedDocumentCount() method to efficiently count the documents in the productModel collection.
If successful, it sends a response with the total count and a success status of true.
In case of an error, it sends an error response with an appropriate message and a success status of false.
Product List Controller:

The productListController function retrieves a list of products based on the requested page.
It accepts the page number as a parameter in the request URL.
Pagination is implemented by skipping the appropriate number of products based on the page number and limiting the results to a fixed number per page (6 in this case).
It also excludes the photo field from the retrieved products to optimize the response.
The products are sorted by createdAt in descending order to display the most recent ones first.
If successful, it sends a response with the products and a success status of true.
In case of an error, it sends an error response with an appropriate message and a success status of false.
----------

Implemented using the page state variable to track the current page.
"Load More" button allows users to fetch more products.
Clicking the button increments the page, triggering a re-render.
Loading Indicator:

Controlled by the loading state variable to indicate data fetching.
"Loading..." displayed when fetching data, providing user feedback.
Total Count:

Fetched using the getTotal function to determine the total number of products.
Filtering Products:

Users can filter products by category and price range.
Filters trigger calls to getAllProducts or filterProduct to retrieve products accordingly.
Product Display:

Products are displayed in cards with details like name, description, and price.
Cards are dynamically generated based on the fetched products.
Load More Button:

Conditionally rendered when there are more products to load (products.length < total).

--------------------------------------------------------------------------------------
15/09/23
Goal- Search box (context api)
//Context Api is making a model in Context folder which is a provider, then we wrap it in index.js and use it as a hook in our files like - useSearch().

1.Make a new route and its controller.
2.Then we make the context API which has keyword and results, include this context(search.js) in index.js.
3.Components>Form> SearchInput.js  - Here we have made a form and passed  keyword and results by destructuring data.

4.In App.js we create new route for (/search)
5.In pages we make new page for Search.js, here the card has been copied from product.js, and in SearchInput we have navigated it to this page.

8:00:03
--------------------------------------------------------------------------------------
17/09/23 
Goal 1- Work on More details button-
1. Route was a nested route in app.js
2. Hooks were made as product and setProduct, axios url(from app.js) was used, and data was destructured and setProduct was given the value.
3.Then just normally rendered using product.name/price etc.
4.Here category has been shown by conditional rendering.

 {product.category && (
                <h6>Category: {product.category.name}</h6>
              )}

Goal 2- To show similar Products
1.Make new route in index.js and controller for it.
2.Then pass pid and cid in route in productdetails page in the axios url.
3.Make hooks- RealtedProducts and setRelatedProducts , and use setter to get the destructured data.
4. Then map relatedProducts to a card.
5. We also add a condition that if relatedProducts are smaller than 1, then show- no similar products.

//Note- when hook is an array we have to use ' s ' like products instead of product.
        
 const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
    setRelatedProducts(data?.products)

6.We also added the homePage button used for more details in search.js, so that product can also be accessed by search box.
--------------------------------------------------------------------------------------
18/09/23

Goal 1- To work on category page dropdown.
1. We make custom hook for our Category page, in components we make new folder called hooks and then useCategory.js.
2. Here we just get the url we made to get products, i.e, get-category.
3.In header- we add dropdown menu(bs)- and map categories(from custom hook) to the list and give diff URL.
4.Sinngle category is retrived by passing the slug.

Goal 2- To show Products acc to category.
1.Create a diff route for it, and controller also which gets category by requesting params.slug.(find method)
2.Add the route in app.js
3. Then we use axios to get the product from the route and then just map it into a card.

-----------------
Goal (main) - CART
1. Make new route and add it to app.js.
2. Make CartPage.js , which uses context api made as cart.js(in context folder).
// Now we have to check if user is logged in or not for payment of product. If not redirect them to Login page.
3.We import useAuth context to check loggin status.
4. Then we check the token and user name by -
  
 {`Hello ${auth?.token && auth?.user?.name}`}

5. Then we just map the photo and details in a card.

Goal 2 - Delete functionallity -
1. Add a delete button , in its on click give function called removeCartItem.
2. Pass pid in the function, spread the cart(...cart), then use findIndex to confirm id and pid, then use splice to remove item.
   And then use  setCart to store the value.

  const removeCartItem=(pid) =>{
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id ===pid)
            myCart.splice(index,1)
            setCart(myCart);

Goal 3 - To store the cart items, as it gets refreshed to 0 after page refresh.
  1.We store it in the local storage in the context api(cart.js)

   localStorage.setItem("cart",JSON.stringify(myCart));

Goal 4 - Then we show the total amount-
1. function - totalPrice
   let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
2. then just pass it to an h4 tag below.

-------------------

Next Goal = User dashboard
1. Make new route as profile in authRoutes, pass isSignedIn middlware.
2.make its controller in authController, which checks logged in user and its fields inputs.
3. In user>profile.js - Make the similar form as register.js, just change the axios method and convert it to PUT and the route we created.
4.There should be a button for updating the user info.
5. Context api for auth is also passed here and data has been destructured and fields are updated.

------------------
Goal - To show address of person in cartPage while checking out ,and check if user is logged in or not, if not then show please login to checkout.

1.We do conditional rendering to check the address of user.
2. We use context api- auth, to check address and the button onClick directs to updateProfile page.
3.It also checks if user is logged in or not, if not then tells to login to checkout.

--------------------------------------------------------------------------9:36:21-------
19/09/23

GOAL - INTEGRATING PAYMENT GATEWAY (Braintree and Paypal)
1. Make account on braintree and the copy the merchant id, public/private key in your env files.
2.In product controller make the gateway(copy from npmjs) and then use env to pass merchant id etc.
3. Make to controllers one for token and one for payment, also make a new orderModel(in model folder).
4. Check npmjs and apply the gateway.
5. We use 2 states- instance, setInstance  and   loading, setLoading.
6. Then we make function to get token where we pass client token(also from braintree package)
7.We conditionally check clientToken, authToken and cartLength to display the payment option.
8. Then we use "DropIn" which is braintree component which gives the payment card, here we set the authorization to clientToken.
9.Then we have a button for payment which is also enabled conditionally and has a function handlePayment.
10.In this function we pass nonce(component of braintree) and instance.
   We also set a method to remove item from card after payment a redirect to orders page.

    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
----------

Goal 2- Working on Orders Page.
1.new route was made for single order . and its controller was made too.
2. We use find method to get fields from orderModel and then populate it.
3. In order.js - We add fields and just map them.

-----
Goal 3- To work on admin order control.
1. We make new routes (2) one to get all orders and one to update order.
2. We make controllers for both, to get all orders just copy the orders controller and just add sort method.
3. To update controller, we request(params, body) and use findByandUpdate.
4.Then we make new file in admin folder as adminOrders.js-
  Here we copy same fields from orders.js 
  Then we make new state for status which was used in OrderModel , and then pass in the useState.
  Then just use our controller to update the order status.

---------------------------------------------------------------------------

Now only UI has to be improved.
