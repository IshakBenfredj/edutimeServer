import  express  from "express";
import  dotenv  from "dotenv";
import  mongoose  from "mongoose";
import  cors  from "cors";
import  helmet  from "helmet";
import  morgan  from "morgan";

// Import Routes
import  generalRouters  from './routes/generalRouters.js'
import  requireRouters  from './routes/requireRouters.js'

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use('/uploads', express.static('uploads'));

// Multer
import multer from "multer";
import {v4 as uuidv4} from "uuid";
import path from "path";

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        cb(null,uuidv4()+'-'+Date.now()+path.extname(file.originalname));
    }
});

const fileFilter = (req,file,cb) => {
    const allowedFileTypes = ['image/jpeg','image/jpg','image/png', 'image/webp'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null,true)
    } else {
        cb(null,false)
    }
}

let upload = multer({storage,fileFilter});

// Routes
app.use('/', upload.single('image'), generalRouters)
app.use('/', upload.single('image'), requireRouters)


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log('connected to db & listening on port',PORT)
    })
}).catch ((error) => {
    console.log(error) 
})