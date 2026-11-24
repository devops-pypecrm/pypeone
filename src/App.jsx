import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import AiPage from './pages/AiPage';
import * as R from './pages/Resources';
import * as Co from './pages/Company';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<R.ProductsIndex />} />
        <Route path="products/:slug" element={<ProductPage group="products" />} />
        <Route path="modules" element={<R.ModulesIndex />} />
        <Route path="modules/:slug" element={<ProductPage group="modules" />} />
        <Route path="solutions" element={<R.GroupIndex group="solutions" />} />
        <Route path="solutions/:slug" element={<ProductPage group="solutions" />} />
        <Route path="roles" element={<R.GroupIndex group="roles" />} />
        <Route path="roles/:slug" element={<ProductPage group="roles" />} />
        <Route path="compare" element={<R.CompareIndex />} />
        <Route path="compare/:slug" element={<R.ComparePage />} />
        <Route path="ai" element={<AiPage />} />
        <Route path="pricing" element={<R.Pricing />} />
        <Route path="security" element={<R.Security />} />
        <Route path="templates" element={<R.Templates />} />
        <Route path="integrations" element={<R.Integrations />} />
        <Route path="blog" element={<R.Blog />} />
        <Route path="blog/:id" element={<R.BlogPost />} />
        <Route path="contact/contact-sales" element={<R.ContactSales />} />
        <Route path="on-demand-demo" element={<R.Demo />} />
        <Route path="download" element={<R.Download />} />
        <Route path="import" element={<R.Import />} />
        <Route path="about" element={<Co.About />} />
        <Route path="careers" element={<Co.Careers />} />
        <Route path="brand" element={<Co.Brand />} />
        <Route path="partners" element={<Co.Partners />} />
        <Route path="terms" element={<Co.Legal kind="terms" />} />
        <Route path="terms/privacy" element={<Co.Legal kind="privacy" />} />
        <Route path="terms/security-policy" element={<Co.Legal kind="security" />} />
        <Route path="login" element={<Co.Auth mode="login" />} />
        <Route path="signup" element={<Co.Auth mode="signup" />} />
        <Route path="*" element={<Co.NotFound />} />
      </Route>
    </Routes>
  );
}
