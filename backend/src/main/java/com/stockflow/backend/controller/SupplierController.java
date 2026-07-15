package com.stockflow.backend.controller;

import com.stockflow.backend.dto.SupplierRequest;
import com.stockflow.backend.dto.SupplierResponse;
import com.stockflow.backend.entity.Supplier;
import com.stockflow.backend.service.SupplierService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    @GetMapping
    public ResponseEntity<List<SupplierResponse>> getAllSuppliers(){
        List<SupplierResponse> suppliers = supplierService.getAllSuppliers().stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(suppliers);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<SupplierResponse> getSupplierById(@PathVariable Long id){
        Supplier supplier = supplierService.getSupplierById(id);
        return ResponseEntity.ok(toResponse(supplier));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<SupplierResponse> getSupplierByName(@PathVariable String name){
        Supplier supplier = supplierService.getSupplierByName(name);
        return ResponseEntity.ok(toResponse(supplier));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<SupplierResponse> getSupplierByEmail(@PathVariable String email){
        Supplier supplier = supplierService.getSupplierByEmail(email);
        return ResponseEntity.ok(toResponse(supplier));
    }

    @PostMapping
    public ResponseEntity<SupplierResponse> createSupplier(@Valid @RequestBody SupplierRequest supplierRequest){
        Supplier supplier = supplierService.saveSupplier(supplierRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(supplier));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierResponse> updateSupplier(@PathVariable Long id, @Valid @RequestBody SupplierRequest supplierRequest){
        Supplier supplier = supplierService.updateSupplier(id, supplierRequest);
        return ResponseEntity.ok(toResponse(supplier));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SupplierResponse> deleteSupplier(@PathVariable Long id) {
        Supplier supplier = supplierService.softDeleteById(id);
        return ResponseEntity.ok(toResponse(supplier));
    }

    private SupplierResponse toResponse(Supplier supplier){
        SupplierResponse supplierResponse = new SupplierResponse();
        supplierResponse.setId(supplier.getId());
        supplierResponse.setName(supplier.getName());
        supplierResponse.setTelephone(supplier.getTelephone());
        supplierResponse.setEmail(supplier.getEmail());
        supplierResponse.setActive(supplier.isActive());

        return supplierResponse;
    }
}
