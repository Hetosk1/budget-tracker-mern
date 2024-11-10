#include <cstdlib> // For system()
#include <iostream>

using namespace std;

int main() {
    system("kill -9 $(sudo lsof -t -i:3000)");
    system("kill -9 $(sudo lsof -t -i:5173)");

    std::cout << "Both backend and frontend applications are force stopped." << std::endl;
    return 0;
}