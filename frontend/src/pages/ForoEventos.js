import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Badge, Modal, Dropdown } from 'react-bootstrap';
import '../styles/ForoEventos.css';

const ForoEventos = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [user, setUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [events, setEvents] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [setLoading] = useState(true);

  // Simulación de autenticación
  useEffect(() => {
    // Simulamos un usuario logueado
    setUser({
      uid: 'user123',
      displayName: 'Usuario Demo',
      email: 'demo@example.com'
    });
    setLoading(false);
  }, []);

  // Simulación de carga de eventos y posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulamos un delay de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Datos simulados de eventos
        const mockEvents = [
          { id: 'event1', title: 'Conferencia de Tecnología' },
          { id: 'event2', title: 'Taller de React' },
          { id: 'event3', title: 'Seminario de IA' }
        ];
        setEvents(mockEvents);

        // Datos simulados de posts
        const mockPosts = [
          {
            id: 'post1',
            content: 'Excelente conferencia, aprendí mucho sobre las últimas tendencias.',
            author: 'Ana Pérez',
            authorId: 'user456',
            createdAt: new Date(),
            likes: ['user123', 'user789'],
            dislikes: [],
            destacado: false,
            eventId: 'event1',
            comments: [
              {
                content: 'Estoy de acuerdo, fue muy informativo.',
                author: 'Carlos Gómez',
                createdAt: new Date()
              }
            ]
          },
          {
            id: 'post2',
            content: '¿Alguien tiene los materiales del taller de React?',
            author: 'Usuario Demo',
            authorId: 'user123',
            createdAt: new Date(),
            likes: [],
            dislikes: [],
            destacado: true,
            eventId: 'event2',
            comments: []
          }
        ];

        // Filtramos si hay un evento seleccionado
        const filteredPosts = selectedEvent 
          ? mockPosts.filter(post => post.eventId === selectedEvent)
          : mockPosts;
        
        setPosts(filteredPosts);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedEvent]);

  // Simulación de submit de post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !user || !selectedEvent) return;

    // Simulamos el envío al backend
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newPostObj = {
      id: `post${Date.now()}`,
      content: newPost,
      author: user.displayName || user.email,
      authorId: user.uid,
      createdAt: new Date(),
      likes: [],
      dislikes: [],
      destacado: false,
      eventId: selectedEvent,
      comments: []
    };

    if (editingPost) {
      setPosts(posts.map(post => 
        post.id === editingPost.id ? { ...post, content: newPost } : post
      ));
      setEditingPost(null);
    } else {
      setPosts([newPostObj, ...posts]);
    }

    setNewPost('');
  };

  // Simulación de reacciones
  const handleReaction = async (postId, reaction) => {
    if (!user) return;
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setPosts(posts.map(post => {
      if (post.id !== postId) return post;
      
      const oppositeReaction = reaction === 'likes' ? 'dislikes' : 'likes';
      const hasOpposite = post[oppositeReaction].includes(user.uid);
      const hasReaction = post[reaction].includes(user.uid);
      
      return {
        ...post,
        [reaction]: hasReaction 
          ? post[reaction].filter(id => id !== user.uid)
          : [...post[reaction], user.uid],
        [oppositeReaction]: hasOpposite 
          ? post[oppositeReaction].filter(id => id !== user.uid)
          : post[oppositeReaction]
      };
    }));
  };

  // Simulación de destacar post
  const handleDestacado = async (postId) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, destacado: true } : post
    ));
  };

  // Simulación de eliminar post
  const handleDeletePost = async (postId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  // Simulación de editar post
  const handleEditPost = (post) => {
    setEditingPost(post);
    setNewPost(post.content);
  };

  // Simulación de añadir comentario
  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setPosts(posts.map(post => {
      if (post.id !== selectedPost.id) return post;
      
      return {
        ...post,
        comments: [
          ...post.comments,
          {
            content: newComment,
            author: user.displayName || user.email,
            createdAt: new Date()
          }
        ]
      };
    }));
    
    setNewComment('');
    setShowCommentModal(false);
  };

  // El resto del componente (JSX) permanece exactamente igual
  return (
    <Container className="foro-eventos-container">
      <h1 className="foro-title">Foro de Eventos</h1>
      <Form.Select 
        value={selectedEvent} 
        onChange={(e) => setSelectedEvent(e.target.value)}
        className="event-select mb-3"
      >
        <option value="">Todos los eventos</option>
        {events.map(event => (
          <option key={event.id} value={event.id}>{event.title}</option>
        ))}
      </Form.Select>
      {user ? (
        <Form onSubmit={handleSubmit} className="mb-4">
          <Form.Group>
            <Form.Control
              as="textarea"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Comparte tu opinión sobre un evento..."
            />
          </Form.Group>
          <Button type="submit" className="mt-2">
            {editingPost ? 'Actualizar' : 'Publicar'}
          </Button>
          {editingPost && (
            <Button variant="secondary" className="mt-2 ml-2" onClick={() => setEditingPost(null)}>
              Cancelar
            </Button>
          )}
        </Form>
      ) : (
        <p>Inicia sesión para publicar comentarios.</p>
      )}
      {posts.map(post => (
        <Card key={post.id} className="mb-3">
          <Card.Body>
            <Card.Title>{post.author}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <Button 
              variant={post.likes.includes(user?.uid) ? "primary" : "outline-primary"} 
              onClick={() => handleReaction(post.id, 'likes')}
              disabled={!user}
            >
              👍 {post.likes?.length || 0}
            </Button>
            <Button 
              variant={post.dislikes.includes(user?.uid) ? "danger" : "outline-danger"} 
              className="mx-2" 
              onClick={() => handleReaction(post.id, 'dislikes')}
              disabled={!user}
            >
              👎 {post.dislikes?.length || 0}
            </Button>
            <Button variant="outline-info" onClick={() => {
              setSelectedPost(post);
              setShowCommentModal(true);
            }}>
              💬 {post.comments?.length || 0}
            </Button>
            {!post.destacado && user?.uid === 'ID_DEL_ADMIN' && (
              <Button variant="outline-warning" onClick={() => handleDestacado(post.id)}>
                Destacar
              </Button>
            )}
            {post.destacado && <Badge bg="warning">Destacado</Badge>}
            {user?.uid === post.authorId && (
              <Dropdown className="float-end">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  ⚙️
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleEditPost(post)}>Editar</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDeletePost(post.id)}>Eliminar</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Card.Body>
        </Card>
      ))}
      <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Comentarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost?.comments?.map((comment, index) => (
            <Card key={index} className="mb-2">
              <Card.Body>
                <Card.Title>{comment.author}</Card.Title>
                <Card.Text>{comment.content}</Card.Text>
              </Card.Body>
            </Card>
          ))}
          {user ? (
            <Form>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Añade un comentario..."
                />
              </Form.Group>
            </Form>
          ) : (
            <p>Inicia sesión para comentar.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
            Cerrar
          </Button>
          {user && (
            <Button variant="primary" onClick={handleAddComment}>
              Comentar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ForoEventos;