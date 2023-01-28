import AWS from 'aws-sdk';
import { Buffer } from 'buffer';
import RNFS from 'react-native-fs'
import { numbers } from '../utils/regex';
import { errorToast } from '../components/toast/toast';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const rekognition = new AWS.Rekognition({ apiVersion: process.env.AWS_REKOGNITION_VERSION });
const s3Bucket = new AWS.S3();

var params = {
    Image: {},
    Filters: {
        WordFilter: {
            MinConfidence: 70,
        },
    },
};

var s3Params = {
    Bucket: process.env.AWS_S3_BUCKET
}

export const detectText = async (image, next) => {
    const base64image = await RNFS.readFile(image, 'base64');
    const buffer = Buffer.from(base64image, 'base64');
    params.Image.Bytes = buffer;

    rekognition.detectText(params, function (err, response) {
        let detected = false;
        if (err) {
            errorToast('Communication Erro', 'Failed to communicate with our image processing server')
            next(null, null)
        } else if (response.TextDetections.length === 0) {
            errorToast('Failed To Detect', 'Failed to recognize zone, please enter manually')
            next(null, null)
        } else {
            let result = response.TextDetections;
            for (var i = 0; i < result.length; i++) {
                if (result[i].Type === 'WORD' && result[i].DetectedText.length === 4 && !detected) {
                    let string = result[i].DetectedText;
                    let code = string.substring(0, 3);
                    let zone = string.substring(3, result[i].DetectedText.length)
                    if (numbers(code)) {
                        detected = true;
                        next(zone, code)
                        break;
                    }
                }
            }
            if (!detected) next(null, null)
        }
    })
}

export const uploadImage = async (status, image) => {
    const response = await fetch(image);
    const blob = await response.blob();

    const timestamp = Date.now();
    const random_digit = Math.floor(Math.random() * 10000)

    const key = `${status}/${timestamp}-${random_digit}.jpeg`

    s3Params.Key = key;
    s3Params.Body = blob;

    await s3Bucket.upload(s3Params, (err, data) => { return })
}