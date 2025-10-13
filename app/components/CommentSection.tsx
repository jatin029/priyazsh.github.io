"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LoginButton from "./LoginButton";
import { db, auth } from "../../lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

interface Comment {
  id: string;
  content: string;
  user_name?: string;
  author?: string;
  user_id?: string;
  user_photo?: string;
  created_at?: {
    seconds: number;
    nanoseconds: number;
  };
}

const Avatar = ({ photoUrl, name }: { photoUrl?: string; name: string }) => {
  const [imageError, setImageError] = useState(false);
  
  if (!photoUrl || imageError) {
    return (
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
        {name[0].toUpperCase()}
      </div>
    );
  }
  
  return (
    <Image
      src={photoUrl}
      alt={`${name}'s profile`}
      width={32}
      height={32}
      className="w-8 h-8 rounded-full object-cover"
      referrerPolicy="no-referrer"
      onError={() => setImageError(true)}
      unoptimized
    />
  );
};

export default function CommentSection({ slug }: { slug: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [postError, setPostError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastCommentTime, setLastCommentTime] = useState<number>(0);

  const validateComment = (content: string): { isValid: boolean; error?: string } => {
    if (!content.trim()) {
      return { isValid: false, error: "Comment cannot be empty" };
    }
    if (content.length > 1000) {
      return { isValid: false, error: "Comment too long (max 1000 characters)" };
    }
    if (content.includes('<script>') || content.includes('javascript:') || content.includes('onload=')) {
      return { isValid: false, error: "Invalid content detected" };
    }
    return { isValid: true };
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  useEffect(() => {
    const loadComments = async () => {
      setLoadError(null);
      const q = query(
        collection(db, "comments"),
        where("slug", "==", slug),
        orderBy("created_at", "asc")
      );
      try {
        const snap = await getDocs(q);
        setComments(
          snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Comment))
        );
      } catch (e) {
        console.error("Error loading comments:", e);
        const error = e as Error;
        setLoadError(error.message);
      }
    };
    loadComments();
  }, [slug]);

  const postComment = async () => {
    if (!user) return;
    
    const now = Date.now();
    if (now - lastCommentTime < 30000) {
      setPostError("Please wait 30 seconds between comments");
      return;
    }
    
    const validation = validateComment(newComment);
    if (!validation.isValid) {
      setPostError(validation.error || "Invalid comment");
      return;
    }

    try {
      setLoading(true);
      setPostError(null);
      
      await addDoc(collection(db, "comments"), {
        slug,
        content: newComment.trim(),
        user_id: user.uid,
        user_name: user.displayName || "Anonymous",
        user_email: user.email || "",
        user_photo: user.photoURL || "",
        created_at: serverTimestamp(),
      });
      
      console.log("User photo URL:", user.photoURL); // Debug log
      
      setNewComment("");
      setLastCommentTime(now);
      
      const q = query(
        collection(db, "comments"),
        where("slug", "==", slug),
        orderBy("created_at", "asc")
      );
      const snap = await getDocs(q);
      setComments(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Comment)));
    } catch (err) {
      console.error("Error posting comment:", err);
      setPostError("Failed to add comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Comment Form - Always Visible */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Comments ({comments.length})
        </h3>
        
        {postError && (
          <div className="p-3 bg-red-800 text-red-200 rounded">
            {postError}
          </div>
        )}
        
        <div className="space-y-3">
          <textarea
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder={user ? "Write a comment... (max 1000 characters)" : "Sign in to write a comment..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            maxLength={1000}
            disabled={!user}
          />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {newComment.length}/1000 characters
            </span>
            
            {user ? (
              <button
                onClick={postComment}
                disabled={loading || !newComment.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {loading ? "Posting..." : "Post Comment"}
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <LoginButton />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comments List - Always Visible */}
      <div className="space-y-4">
        {loadError && (
          <div className="p-4 bg-red-800 text-red-200 rounded-lg">
            <p>Error loading comments: {loadError}</p>
            <p>
              You might need to <a
                href={"https://console.firebase.google.com/project/" + process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + "/firestore/indexes"}
                target="_blank"
                rel="noopener"
                className="underline hover:text-red-100"
              >create the required index</a>.
            </p>
          </div>
        )}

        {comments.length === 0 && !loadError ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No comments yet. Be the first to comment!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Avatar 
                      photoUrl={c.user_photo} 
                      name={c.user_name || c.author || 'Anonymous'} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
                        {c.user_name || c.author || "Anonymous"}
                      </p>
                      {c.created_at && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(c.created_at.seconds * 1000).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap break-words">
                      {c.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
