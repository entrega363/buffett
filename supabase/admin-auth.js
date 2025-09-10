// Autenticação do painel administrativo com Supabase
import supabase from './client.js';
import { login, logout, getCurrentUser } from './auth.js';
import { AdminsService } from './services.js';

// Função para verificar autenticação no painel administrativo
export async function checkAdminAuth() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      showAdminLogin();
      return false;
    }

    // Verificar se o usuário é um administrador
    const admin = await AdminsService.getByEmail(user.email);
    if (!admin || admin.status !== 'active') {
      showAdminLogin();
      return false;
    }

    showAdminDashboard(admin);
    return true;
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    showAdminLogin();
    return false;
  }
}

// Função para mostrar tela de login do administrador
export function showAdminLogin() {
  const loginContainer = document.getElementById('loginContainer');
  const dashboard = document.getElementById('dashboard');
  
  if (loginContainer) {
    loginContainer.style.display = 'flex';
  }
  
  if (dashboard) {
    dashboard.style.display = 'none';
  }
  
  // Limpar formulário de login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.reset();
    document.getElementById('errorMessage').style.display = 'none';
  }
}

// Função para mostrar dashboard do administrador
export async function showAdminDashboard(adminData) {
  const loginContainer = document.getElementById('loginContainer');
  const dashboard = document.getElementById('dashboard');
  
  if (loginContainer) {
    loginContainer.style.display = 'none';
  }
  
  if (dashboard) {
    dashboard.style.display = 'block';
    
    // Atualizar título do dashboard com nome do admin
    const titleElement = document.querySelector('.dashboard-title');
    if (titleElement && adminData) {
      titleElement.innerHTML = `
        🍰 Painel Administrativo - Buffet Sobral<br>
        <small style="font-size: 0.8rem; opacity: 0.8;">
          Logado como: ${adminData.name} ${adminData.role === 'master' ? '(Master)' : ''}
        </small>
      `;
    }
    
    // Verificar se é master admin para mostrar seção de administradores
    if (adminData && adminData.role === 'master') {
      document.getElementById('adminSection').style.display = 'block';
    }
    
    // Aguardar um momento para garantir que o DOM esteja pronto
    setTimeout(async () => {
      // Carregar todos os dados do painel
      await loadAdminDashboardData();
    }, 100);
  }
}

// Função para carregar dados do dashboard administrativo
async function loadAdminDashboardData() {
  try {
    // Carregar todos os dados necessários
    const [
      services,
      contactInfo,
      packages,
      reviews,
      photos,
      videos,
      admins
    ] = await Promise.all([
      ServicesService.getAll(),
      ContactService.get(),
      PackagesService.getAll(),
      ReviewsService.getAll(),
      PhotosService.getAll(),
      VideosService.getAll(),
      AdminsService.getAll()
    ]);

    // Atualizar UI com os dados
    updateServicesOnAdminPanel(services);
    
    if (contactInfo) {
      updateContactInfoOnAdminPanel(contactInfo);
    }
    
    updatePackagesOnAdminPanel(packages);
    updateReviewsOnAdminPanel(reviews);
    updatePhotosOnAdminPanel(photos);
    updateVideosOnAdminPanel(videos);
    
    // Atualizar administradores apenas se for master
    const currentUser = await getCurrentUser();
    const currentAdmin = await AdminsService.getByEmail(currentUser.email);
    
    if (currentAdmin && currentAdmin.role === 'master') {
      updateAdminsOnAdminPanel(admins);
    }
    
    console.log('Dados do dashboard administrativo carregados com sucesso');
  } catch (error) {
    console.error('Erro ao carregar dados do dashboard administrativo:', error);
  }
}

// Função para login do administrador
export async function adminLogin(email, password) {
  try {
    // Tentar login com Supabase Auth
    const { data, error: authError } = await login(email, password);
    
    if (authError) {
      throw new Error('Credenciais inválidas');
    }
    
    // Verificar se o usuário é um administrador ativo
    const admin = await AdminsService.getByEmail(email);
    
    if (!admin) {
      // Logout se não for administrador
      await logout();
      throw new Error('Usuário não é um administrador');
    }
    
    if (admin.status !== 'active') {
      // Logout se estiver suspenso
      await logout();
      throw new Error('Conta de administrador suspensa');
    }
    
    // Salvar dados do administrador na sessão
    localStorage.setItem('adminAuth', JSON.stringify({
      isLoggedIn: true,
      userId: data.user.id,
      adminId: admin.id,
      adminEmail: admin.email,
      adminName: admin.name,
      adminRole: admin.role,
      adminStatus: admin.status,
      loginTime: new Date().getTime()
    }));
    
    showAdminDashboard(admin);
    return admin;
  } catch (error) {
    console.error('Erro no login do administrador:', error);
    throw error;
  }
}

// Função para logout do administrador
export async function adminLogout() {
  try {
    // Logout do Supabase Auth
    await logout();
    
    // Limpar dados da sessão
    localStorage.removeItem('adminAuth');
    
    // Mostrar tela de login
    showAdminLogin();
    
    console.log('Logout de administrador realizado com sucesso');
  } catch (error) {
    console.error('Erro no logout do administrador:', error);
    throw error;
  }
}

// Função para verificar se usuário está logado
export async function isAdminLoggedIn() {
  const adminAuth = localStorage.getItem('adminAuth');
  if (!adminAuth) return false;
  
  try {
    const authData = JSON.parse(adminAuth);
    if (!authData.isLoggedIn) return false;
    
    // Verificar se a sessão ainda é válida (ex: 24 horas)
    const currentTime = new Date().getTime();
    const loginTime = authData.loginTime;
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 horas
    
    if (currentTime - loginTime > sessionDuration) {
      // Sessão expirada
      await adminLogout();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao verificar sessão de administrador:', error);
    return false;
  }
}

export default {
  checkAdminAuth,
  showAdminLogin,
  showAdminDashboard,
  adminLogin,
  adminLogout,
  isAdminLoggedIn
};