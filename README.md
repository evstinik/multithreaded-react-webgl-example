# Multithreaded React WebGL application with shared store

This is an example of multithreaded React WebGL application with shared Valtio store.

There are two threads:

- Main thread
- Render thread with OffscreenCanvas

Both have local instance of valtio store.

Store is synchronized via Broadcast Channel API.

Read more in blog post.
