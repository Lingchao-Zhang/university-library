import { Client } from "@upstash/workflow";
import config from "./config";
import emailjs from '@emailjs/browser';

export const workflowClient = new Client({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken
})

export const sendEmail = async (email: string, fullName: string, templateID: string) => {
    // send email using emailjs

    // 1. get public key, serviceID and templateID from config
    const { publicKey, serviceID } = config.env.emailJS

    // construct the template parameters
    const templateParams = {
        email,
        fullName
    }

    try{
        emailjs.send(serviceID, templateID, templateParams, {publicKey});
        return { success: true }
    } catch(error){
        console.log(error)
        return { success: false, error: "Unexpected error while sending email!" }
    }
}