import { Databases, Client, ID, Storage, Query } from "appwrite";
import conf from '../conf/conf'

export class DatabaseService {
    client = new Client();
    databases;
    buckets;
    postId;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
        this.databases = new Databases(this.client);
        this.buckets = new Storage(this.client);
        this.postId = ID.unique();
    }



    async createPost({ title, slug, description, featuredImages, status, userId }) {
        try {
            console.log({ title, slug, description, featuredImages, status, userId });
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    description,
                    featuredImages,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("The Error is in creating post error:: ", error);
        }
    }

    async updatePost({ title, slug, description, featuredImages, status }) {
        try {
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    description,
                    featuredImages,
                    status
                }
            )
        } catch (error) {
            console.log("The Error is in updating post error :: ", error);
        }
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        } catch (error) {
            console.log("The Error is in Deleting Post error :: ", error);
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        } catch (error) {
            console.log("The Error is in getting post error :: ", error);
        }
    }

    async getAllPost(qureies = [Query.equal("status", 'Active,Inactive')]) {
        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                qureies
            )
        } catch (error) {
            console.log("The Error is in getting All Post error:: ", error);
        }
    }

    async uploadFile(file) {
        try {
            return await this.buckets.createFile(
                conf.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("The Error is in Uploaing File error:: ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.buckets.deleteFile(
                conf.bucketId,
                fileId
            )
            return true;

        } catch (error) {
            console.log("The Error is in deleting file error :: ", error);
            return false;
        }
    }

    async getFilePreview(fileId) {
        try {
            // console.log(fileId);
            const result = await this.buckets.getFilePreview(
                conf.bucketId,
                fileId
            )
            // console.log(result);
            return result;
        } catch (error) {
            console.log("The Error is in file Preview error:: ", error);
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;