const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Route imports
const projectRoutes = require("./routes/projectRoutes");
const blogRoutes = require("./routes/blogRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

// Models for seed data
const Project = require("./models/Project");
const Blog = require("./models/Blog");

// Connect to Database
connectDB().then(() => {
  // Seed initial data if database is empty
  seedData();
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  app.use(morgan("dev"));
}

// REST Endpoints
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/appointments", appointmentRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Shapen Construction MERN API is running...");
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});

// Database seeding helper
async function seedData() {
  try {
    const projectCount = await Project.countDocuments();
    const firstProject = await Project.findOne();
    const hasStaleData = firstProject && !firstProject.fullDescription;

    if (projectCount === 0 || hasStaleData) {
      if (hasStaleData) {
        console.log(
          "Detected stale projects in database. Re-seeding detailed project documents...",
        );
        await Project.deleteMany({});
      } else {
        console.log("Seeding initial projects data...");
      }

      const seedProjects = [
        {
          title: "Muscat Corporate Center",
          category: "Commercial",
          location: "Muscat, Oman",
          description:
            "A state-of-the-art office skyscraper featuring high-end architectural glass, modern workspace designs, and gold LEED energy certification.",
          imageUrl:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
          featured: true,
          fullDescription:
            "A landmark 45-story commercial skyscraper standing in the heart of Muscat's financial district. The project represents a masterclass in modern structural engineering, featuring state-of-the-art curtain wall glazing, column-free floor plans, and carbon-neutral building techniques.",
          objectives:
            "To design a sustainable, iconic high-rise office complex that satisfies Muscat's growing corporate hub requirements while achieving gold LEED energy certification ratings.",
          challenges:
            "Constructing high-load bearing foundations on sandy, coastal soils close to sea level, and managing high-temperature environment heat loads on large glass facades.",
          solutions:
            "We utilized advanced friction pile concrete foundations driven 45 meters deep, and installed triple-pane low-E thermal glass panels with reflective coatings to block infrared rays, reducing air conditioning load by 35%.",
          client: "Oman Investment Authority",
          startDate: new Date("2024-02-15"),
          completionDate: new Date("2026-06-20"),
          budget: "$85,000,000",
          technologies: [
            "LEED Energy Modeling",
            "Friction Piling Foundation",
            "Low-E Glazing Systems",
            "BIM 3D Mapping",
          ],
          features: [
            "Column-Free Interior Office Floorplans",
            "Kinetic Solar Panel Facade Grid",
            "Smart Climate Airflow Controllers",
            "Water Reclamation Filtering Yards",
          ],
          galleryImages: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=600",
          ],
        },
        {
          title: "Al Mouj Luxury Villas",
          category: "Residential",
          location: "Muscat, Oman",
          description:
            "Premium seaside villas showcasing modern architectural geometry, custom interior layouts, and energy-efficient climate control.",
          imageUrl:
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop",
          featured: true,
          fullDescription:
            "A boutique enclave of 12 sea-facing signature residences. Each villa is a blend of geometric modernism and traditional Omani light screens, incorporating double-height living areas, private infinity pools, and integrated smart home operations.",
          objectives:
            "To offer ultra-luxury living spaces that blend seamlessly with coastal environments, utilizing natural local stone cladding and energy-independent solar arrays.",
          challenges:
            "Integrating heavy stone facades on cantilevered concrete floors without compromising the light, open architectural geometry.",
          solutions:
            "Post-tensioned concrete slabs were utilized to allow massive structural cantilevers of up to 5 meters, supported by high-strength structural carbon frames concealed in partition walls.",
          client: "Al Mouj Development LLC",
          startDate: new Date("2024-05-10"),
          completionDate: new Date("2025-11-15"),
          budget: "$14,500,000",
          technologies: [
            "Post-Tensioned Cantilevers",
            "Smart Home Automation",
            "Off-grid Solar Battery Inverters",
            "Local Stone Cladding",
          ],
          features: [
            "Private Infinity Edge Beachside Pools",
            "Custom Geometric Sun Shading Panels",
            "Triple-Lock Secure Perimeter Scanners",
            "Integrated Natural Geothermal Ventings",
          ],
          galleryImages: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=600",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600",
          ],
        },
        {
          title: "Modern Library Complex",
          category: "Education",
          location: "Amman, Jordan",
          description:
            "A sprawling educational campus addition integrating reading zones, digital lounges, and sustainable concrete elements.",
          imageUrl:
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop",
          featured: true,
          fullDescription:
            "A structural hub for learning and research, housing over 200,000 text archives and offering digital labs, lecture halls, and quiet study rooms. The building is designed as a community anchor with exposed timber roof trusses and green wall gardens.",
          objectives:
            "Create an open, welcoming academic center focusing on high natural lighting, acoustic insulation, and indoor ecological plant grids.",
          challenges:
            "Managing sound levels across massive open reading halls and controlling humidity to protect sensitive historical archives.",
          solutions:
            "Installed custom micro-perforated wood ceiling slats for acoustic dampening, and set up compartmentalized HVAC systems with mechanical dehumidification guards.",
          client: "Ministry of Higher Education",
          startDate: new Date("2023-09-01"),
          completionDate: new Date("2025-08-30"),
          budget: "$28,000,000",
          technologies: [
            "Acoustic Ceiling Slats",
            "Precision Dehumidification HVAC",
            "Sustainable Glulam Timber Roofs",
            "Rainwater Harvesting Systems",
          ],
          features: [
            "Multi-story Vertical Plant Gardens",
            "Silent Individual Study Pods",
            "Subterranean Archive Storage Vaults",
            "Natural Skylight Central Atrium",
          ],
          galleryImages: [
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600",
            "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600",
            "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600",
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600",
          ],
        },
        {
          title: "Prime Hub Headquarters",
          category: "Office",
          location: "Dubai, UAE",
          description:
            "Contemporary multi-floor administrative headquarters boasting open floor plans, modular desks, and smart building interfaces.",
          imageUrl:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
          featured: false,
          fullDescription:
            "A contemporary 10-story office headquarters built for rapid-growth tech firms in Dubai. It features open-plan coworking zones, acoustic design screens, high-capacity cooling vents, and central automated facilities.",
          objectives:
            "To offer highly adaptive workspace environments that scale with occupancy layouts.",
          challenges:
            "Installing smart occupancy-sensing HVAC controls and maintaining low environmental decibel ratings in massive glass atriums.",
          solutions:
            "Utilized IoT occupancy trackers linked to variable airflow damping units, and fitted double-glazed glass pane walls with acoustic spacer tabs.",
          client: "Prime Investments Dubai",
          startDate: new Date("2023-11-01"),
          completionDate: new Date("2025-04-15"),
          budget: "$34,000,000",
          technologies: [
            "IoT Climate Regulation",
            "Open Layout Steel Framing",
            "Double-Glazed Acoustic Glazing",
            "Smart Access Control Sensors",
          ],
          features: [
            "Active Coworking Common Yards",
            "Adaptive Light Control Dimmers",
            "Integrated Roof Garden Deck",
            "Central Water Filtration Node",
          ],
          galleryImages: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=600",
          ],
        },
        {
          title: "Spectrum Academic Wing",
          category: "Education",
          location: "Nizwa, Oman",
          description:
            "New facility for engineering and laboratory studies, constructed using locally sourced stone and custom ventilation architecture.",
          imageUrl:
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
          featured: false,
          fullDescription:
            "A modern engineering and science laboratory expansion for academic studies. It features high-capacity air ventilation fume hoods, chemical-resistant resin countertops, and specialized cleanroom zones.",
          objectives:
            "Create an advanced, ultra-safe research building complying with national cleanroom chemical hazard guidelines.",
          challenges:
            "Designing custom exhaust routes that safely scrub acid fumes and maintaining positive pressure in sterile lab chambers.",
          solutions:
            "Fitted dedicated acid scrubbing towers on the roof and integrated air pressurization control dampers.",
          client: "Nizwa Technological Institute",
          startDate: new Date("2024-03-01"),
          completionDate: new Date("2025-09-30"),
          budget: "$19,500,000",
          technologies: [
            "Cleanroom Pressurizers",
            "Acid Fume Air Scrubbers",
            "Resin Lab Countertops",
            "High-efficiency Exhaust Fans",
          ],
          features: [
            "Chemical Leak Detection Grids",
            "Sterile Pressure Lock Chambers",
            "Exposed Utility Pipe Trays",
            "Seismic Load Counterweights",
          ],
          galleryImages: [
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600",
            "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=600",
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600",
            "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600",
          ],
        },
        {
          title: "Marina View Apartments",
          category: "Residential",
          location: "Doha, Qatar",
          description:
            "High-rise residential project incorporating a gym, infinity pool, smart apartments, and breathtaking structural layouts.",
          imageUrl:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop",
          featured: false,
          fullDescription:
            "A premium residential high-rise tower containing 150 luxury sea-view apartments, equipped with a top-deck sky lounge, infinity swimming pool, and underground parking structures.",
          objectives:
            "Provide elegant oceanfront urban living with standard structural earthquake dampening and premium interior finishes.",
          challenges:
            "Excavating for a 3-level underground parking basement immediately adjacent to the tidal sea wall.",
          solutions:
            "Constructed a heavy perimeter secant concrete pile wall and deployed continuous groundwater dewatering pumps during excavation.",
          client: "Doha Coastal Properties",
          startDate: new Date("2023-05-15"),
          completionDate: new Date("2025-12-20"),
          budget: "$62,000,000",
          technologies: [
            "Secant Pile Tide Barriers",
            "Subterranean Dewatering",
            "Sky-Deck Cantilever Engineering",
            "Earthquake Base Isolators",
          ],
          features: [
            "Basement Under-Tidal Garage",
            "Heated Roof Infinity Pool",
            "Smart-Lock Unit Entrances",
            "Private Sea-Facing Balconies",
          ],
          galleryImages: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600",
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600",
          ],
        },
      ];
      await Project.insertMany(seedProjects);
      console.log("Projects successfully seeded!");
    }

    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      console.log("Seeding initial blog posts data...");
      const seedBlogs = [
        {
          title: "The Future of Sustainable Architecture",
          content:
            "As environmental concerns rise, the construction industry is shifting toward green building techniques. From kinetic solar panels and rain gardens to self-healing concrete, developers are seeking ways to build that minimize ecological footprints while enhancing building longevity.",
          author: "Sarah Jenkins (Architectural Lead)",
          imageUrl:
            "https://images.unsplash.com/photo-1503387762-592dedb8c310?q=80&w=600&auto=format&fit=crop",
        },
        {
          title: "A Guide to Renovating Historical Properties",
          content:
            "Renovating historical properties requires a careful balance between preserving character and introducing modern structural safety. Our team reviews how load-bearing integrity is analyzed and how historical details can be kept while upgrading standard plumbing, electrical systems, and insulations.",
          author: "David Vance (Senior Engineer)",
          imageUrl:
            "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=600&auto=format&fit=crop",
        },
        {
          title: "Smart Technologies Changing Commercial Building Design",
          content:
            "Internet of Things (IoT) sensors, automated lighting grids, and integrated HVAC feedback systems are reshaping commercial buildings. Learn how developers can design structures that adapt to occupancy rates dynamically, cutting utility expenditures and improving employee productivity.",
          author: "Mark Rutherford (Operations Director)",
          imageUrl:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
        },
      ];
      await Blog.insertMany(seedBlogs);
      console.log("Blogs successfully seeded!");
    }
  } catch (err) {
    console.error("Failed to seed database:", err);
  }
}
