export interface Post {
    id?: String,
    title: String,
    content: String,
    author:String,
    tags?: [String],
    comments?: [{
        author: String,
        email: String,
        content: String,
        date: String,
        replies: [{
            author: String,
            email: String,
            content: String,
            date: String,
        }]
    }],
    created_at?: String,
    updated_at?: String,
};

