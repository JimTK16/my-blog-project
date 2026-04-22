-- seed.sql
-- Use this to repopulate your posts table after a 'DROP TABLE'

INSERT INTO posts (title, slug, content, card_image_url, is_published)
VALUES 
(
  'Building RESTful APIs with Spring Boot', 
  'building-restful-apis-spring-boot', 
  'Spring Boot makes it incredibly easy to create stand-alone, production-grade Spring based Applications. In this post, we explore how to use **Spring Initializr**, set up a **Controller**, and map our first **GET** endpoint. \n\n```java\n@RestController\npublic class HelloController {\n    @GetMapping("/api/hello")\n    public String sayHello() {\n        return "Hello from the Backend!";\n    }\n}\n```', 
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000', 
  true
),
(
  'The Secret to Perfect Wood-Fired Pizza Dough', 
  'secret-wood-fired-pizza-dough', 
  'Transitioning from a professional kitchen to coding hasn''t changed my love for a perfect crust. Working with wood-fired ovens taught me that **hydration** and **temperature** are the most critical variables. \n\n### My Top 3 Tips:\n1. **High Protein Flour**: Use 00 flour for that characteristic stretch.\n2. **Long Fermentation**: Let it rest in the fridge for at least 24 hours.\n3. **Floor Temp**: Ensure the stone is at least 400°C before the first launch.', 
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000', 
  true
),
(
  'Why I Chose Supabase for my Portfolio', 
  'why-i-chose-supabase', 
  'When building a personal blog, I wanted a backend that felt as powerful as the Enterprise systems I study in the Java ecosystem, but with the speed of a modern SaaS. \n\n**Supabase** provides:\n* **PostgreSQL**: A real relational database.\n* **Row Level Security**: Secure data access right out of the box.\n* **Storage**: A place to keep my blog images without a separate provider.', 
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000', 
  false -- This one stays as a Draft for testing
);

Dependency Injection (DI) is the backbone of the Spring Framework. It allows for loose coupling by shifting the responsibility of object creation from the developer to the Spring Container.

### 1. What is Dependency Injection?
In a traditional Java application, if Class A needs Class B, it creates an instance using `new ClassB()`. This creates a tight coupling. If Class B changes, Class A might break. In Spring, we tell the container: "Class A needs an object of type B," and Spring provides it.

### 2. Constructor vs. Field Injection
While you might see `@Autowired` on private fields in older tutorials, **Constructor Injection** is the industry standard for several reasons:
* **Immutability**: Fields can be marked `final`.
* **Testability**: You don't need a Spring context to unit test with mocks.
* **Safety**: You can''t create an object in an incomplete state.

```java
@Service
public class OrderService {
    private final PaymentGateway paymentGateway;

    // Standard Constructor Injection
    public OrderService(PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    public void processOrder(Order order) {
        paymentGateway.charge(order.getAmount());
    }
}